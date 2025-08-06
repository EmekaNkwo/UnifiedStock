import { baseApi as api } from "./base-api";
export const addTagTypes = ["categories"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      categoryControllerCreate: build.mutation<
        CategoryControllerCreateApiResponse,
        CategoryControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/categories`,
          method: "POST",
          body: queryArg.createCategoryDto,
        }),
        invalidatesTags: ["categories"],
      }),
      categoryControllerFindAll: build.query<
        CategoryControllerFindAllApiResponse,
        CategoryControllerFindAllApiArg
      >({
        query: () => ({ url: `/api/categories` }),
        providesTags: ["categories"],
      }),
      categoryControllerGetCategoryTree: build.query<
        CategoryControllerGetCategoryTreeApiResponse,
        CategoryControllerGetCategoryTreeApiArg
      >({
        query: () => ({ url: `/api/categories/tree` }),
        providesTags: ["categories"],
      }),
      categoryControllerFindOne: build.query<
        CategoryControllerFindOneApiResponse,
        CategoryControllerFindOneApiArg
      >({
        query: (queryArg) => ({ url: `/api/categories/${queryArg.id}` }),
        providesTags: ["categories"],
      }),
      categoryControllerUpdate: build.mutation<
        CategoryControllerUpdateApiResponse,
        CategoryControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/categories/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateCategoryDto,
        }),
        invalidatesTags: ["categories"],
      }),
      categoryControllerRemove: build.mutation<
        CategoryControllerRemoveApiResponse,
        CategoryControllerRemoveApiArg
      >({
        query: (queryArg) => ({
          url: `/api/categories/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["categories"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as categoryApi };
export type CategoryControllerCreateApiResponse =
  /** status 201 Category successfully created */ CategoryResponseDto;
export type CategoryControllerCreateApiArg = {
  createCategoryDto: CreateCategoryDto;
};
export type CategoryControllerFindAllApiResponse =
  /** status 200 Returns list of categories */ CategoryResponseDtoWithoutCreatedBy[];
export type CategoryControllerFindAllApiArg = void;
export type CategoryControllerGetCategoryTreeApiResponse =
  /** status 200 Returns category tree */ CategoryResponseDtoWithoutCreatedBy[];
export type CategoryControllerGetCategoryTreeApiArg = void;
export type CategoryControllerFindOneApiResponse =
  /** status 200 Returns the category */ UpdateCategoryResponseDto;
export type CategoryControllerFindOneApiArg = {
  /** Category ID */
  id: string;
};
export type CategoryControllerUpdateApiResponse =
  /** status 200 Category updated successfully */ UpdateCategoryResponseDto;
export type CategoryControllerUpdateApiArg = {
  /** Category ID */
  id: string;
  updateCategoryDto: UpdateCategoryDto;
};
export type CategoryControllerRemoveApiResponse = unknown;
export type CategoryControllerRemoveApiArg = {
  /** Category ID */
  id: string;
};
export type UserResponseWithTenantIdDto = {
  id: string;
  username: string;
  role: string;
  tenantId: string;
};
export type CategoryResponseDto = {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  parent: CategoryResponseDto;
  parentId: string;
  children: CategoryResponseDto[];
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy: UserResponseWithTenantIdDto;
};
export type CreateCategoryDto = {
  name: string;
  description: string;
  parentId: string;
};
export type CategoryResponseDtoWithoutCreatedBy = {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  parent: CategoryResponseDto;
  parentId: string;
  children: CategoryResponseDto[];
  createdAt: string;
  updatedAt: string;
  createdById: string;
};
export type InventoryItemDto = {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  minStockLevel: number;
  categoryId: string;
  category: CategoryResponseDto;
};
export type UpdateCategoryResponseDto = {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  parent: CategoryResponseDto;
  parentId: string;
  children: CategoryResponseDto[];
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy: UserResponseWithTenantIdDto;
  items?: InventoryItemDto[];
};
export type UpdateCategoryDto = {
  name?: string;
  description?: string;
  parentId?: string;
};
export const {
  useCategoryControllerCreateMutation,
  useCategoryControllerFindAllQuery,
  useCategoryControllerGetCategoryTreeQuery,
  useCategoryControllerFindOneQuery,
  useCategoryControllerUpdateMutation,
  useCategoryControllerRemoveMutation,
} = injectedRtkApi;
