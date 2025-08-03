import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';

import { User } from '../auth/entities/user.entity';
import { Role } from '../auth/entities/role.enum';
import ResponseHelper from '../common/helpers/response.helper';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  private checkAdminAccess(user: User, tenantId: string): void {
    if (user.role === Role.SUPER_ADMIN) return;
    if (user.role === Role.TENANT_ADMIN && user.tenantId === tenantId) return;
    throw ResponseHelper.forbidden('Insufficient permissions');
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    tenantId: string,
    user: User,
  ): Promise<Category> {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      tenantId,
      createdBy: user,
      createdById: user.id,
    });

    if (createCategoryDto.parentId) {
      const parent = await this.findOne(
        createCategoryDto.parentId,
        tenantId,
        user,
      );
      category.parent = parent;
    }

    return this.categoryRepository.save(category);
  }

  async findAll(tenantId: string, user: User): Promise<Category[]> {
    // Regular users can only see categories from their tenant
    if (user.role !== Role.SUPER_ADMIN && user.tenantId !== tenantId) {
      throw ResponseHelper.forbidden('Access to this tenant is denied');
    }

    return this.categoryRepository.find({
      where: { tenantId },
      relations: ['parent', 'children'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string, tenantId: string, user: User): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id, tenantId } as FindOptionsWhere<Category>,
      relations: ['parent', 'children', 'items'],
    });

    if (!category) {
      throw ResponseHelper.notFound(`Category with ID ${id} not found`);
    }

    // Check if user has access to this category's tenant
    if (user.role !== Role.SUPER_ADMIN && category.tenantId !== user.tenantId) {
      throw ResponseHelper.forbidden('Access to this category is denied');
    }

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    tenantId: string,
    user: User,
  ): Promise<Category> {
    this.checkAdminAccess(user, tenantId);

    const category = await this.findOne(id, tenantId, user);

    if (updateCategoryDto.parentId !== undefined) {
      if (updateCategoryDto.parentId === null) {
        category.parent = null;
      } else if (updateCategoryDto.parentId) {
        const parent = await this.findOne(
          updateCategoryDto.parentId,
          tenantId,
          user,
        );
        // Prevent circular references
        if (parent.id === id) {
          throw ResponseHelper.badRequest('Category cannot be its own parent');
        }
        category.parent = parent;
      }
    }

    Object.assign(category, {
      ...updateCategoryDto,
      parentId: undefined, // We handle parent separately
    });

    return this.categoryRepository.save(category);
  }

  async remove(id: string, tenantId: string, user: User): Promise<void> {
    this.checkAdminAccess(user, tenantId);

    const category = await this.findOne(id, tenantId, user);

    // Check if category has items or children
    const [itemsCount, childrenCount] = await Promise.all([
      this.categoryRepository
        .createQueryBuilder('category')
        .leftJoin('category.items', 'items')
        .where('category.id = :id', { id })
        .select('COUNT(items.id)', 'count')
        .getRawOne(),
      this.categoryRepository.count({
        where: { parent: { id } } as FindOptionsWhere<Category>,
      }),
    ]);

    if (itemsCount?.count > 0) {
      throw ResponseHelper.badRequest(
        'Cannot delete category with associated items',
      );
    }

    if (childrenCount > 0) {
      throw ResponseHelper.badRequest(
        'Cannot delete category with child categories',
      );
    }

    await this.categoryRepository.remove(category);
  }

  async getCategoryTree(tenantId: string, user: User): Promise<Category[]> {
    if (user.role !== Role.SUPER_ADMIN && user.tenantId !== tenantId) {
      throw ResponseHelper.forbidden('Access to this tenant is denied');
    }

    const categories = await this.categoryRepository.find({
      where: { tenantId },
      relations: ['children'],
      order: { name: 'ASC' },
    });

    // Build the category tree
    const categoryMap = new Map<string, Category>();
    const rootCategories: Category[] = [];

    // First pass: create map of all categories
    categories.forEach((category) => {
      category.children = [];
      categoryMap.set(category.id, category);
    });

    // Second pass: build the tree
    categories.forEach((category) => {
      if (category.parent && categoryMap.has(category.parent.id)) {
        const parent = categoryMap.get(category.parent.id);
        parent.children.push(category);
      } else {
        rootCategories.push(category);
      }
    });

    return rootCategories;
  }
}
