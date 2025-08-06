import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TenantGuard } from '../guards/tenant.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import ResponseHelper from '../common/helpers/response.helper';
import {
  CategoryResponseDto,
  CategoryResponseDtoWithoutCreatedBy,
  UpdateCategoryResponseDto,
} from './dto/category-response.dto';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category successfully created',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const category = await this.categoryService.create(
      createCategoryDto,
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success(
      'Category created successfully',
      category,
      201,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories for the current tenant' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of categories',
    type: [CategoryResponseDtoWithoutCreatedBy],
  })
  async findAll(@Request() req) {
    const categories = await this.categoryService.findAll(
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success(
      'Categories retrieved successfully',
      categories,
    );
  }

  @Get('tree')
  @ApiOperation({ summary: 'Get category tree for the current tenant' })
  @ApiResponse({
    status: 200,
    description: 'Returns category tree',
    type: [CategoryResponseDtoWithoutCreatedBy],
  })
  async getCategoryTree(@Request() req) {
    const categoryTree = await this.categoryService.getCategoryTree(
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success(
      'Category tree retrieved successfully',
      categoryTree,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the category',
    type: UpdateCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: string, @Request() req) {
    const category = await this.categoryService.findOne(
      id,
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success('Category retrieved successfully', category);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: UpdateCategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req,
  ) {
    const category = await this.categoryService.update(
      id,
      updateCategoryDto,
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success('Category updated successfully', category);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Cannot delete category with items or children',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.categoryService.remove(id, req.user.tenantId, req.user);
    return ResponseHelper.success('Category deleted successfully');
  }
}
