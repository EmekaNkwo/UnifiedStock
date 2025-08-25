import { baseApi as api } from "./base-api";
export const addTagTypes = ["inventory"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      inventoryControllerCreate: build.mutation<
        InventoryControllerCreateApiResponse,
        InventoryControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/inventory`,
          method: "POST",
          body: queryArg.createItemDto,
        }),
        invalidatesTags: ["inventory"],
      }),
      inventoryControllerFindAll: build.query<
        InventoryControllerFindAllApiResponse,
        InventoryControllerFindAllApiArg
      >({
        query: (queryArg) => ({
          url: `/api/inventory`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
          },
        }),
        providesTags: ["inventory"],
      }),
      inventoryControllerFindOne: build.query<
        InventoryControllerFindOneApiResponse,
        InventoryControllerFindOneApiArg
      >({
        query: (queryArg) => ({ url: `/api/inventory/${queryArg.id}` }),
        providesTags: ["inventory"],
      }),
      inventoryControllerUpdate: build.mutation<
        InventoryControllerUpdateApiResponse,
        InventoryControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/inventory/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.createItemDto,
        }),
        invalidatesTags: ["inventory"],
      }),
      inventoryControllerRemove: build.mutation<
        InventoryControllerRemoveApiResponse,
        InventoryControllerRemoveApiArg
      >({
        query: (queryArg) => ({
          url: `/api/inventory/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["inventory"],
      }),
      inventoryControllerUpdateStatus: build.mutation<
        InventoryControllerUpdateStatusApiResponse,
        InventoryControllerUpdateStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/api/inventory/${queryArg.id}/status`,
          method: "PATCH",
        }),
        invalidatesTags: ["inventory"],
      }),
      inventoryControllerCheckStockLevels: build.query<
        InventoryControllerCheckStockLevelsApiResponse,
        InventoryControllerCheckStockLevelsApiArg
      >({
        query: () => ({ url: `/api/inventory/stock/check` }),
        providesTags: ["inventory"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as inventoryApi };
export type InventoryControllerCreateApiResponse =
  /** status 201 Item created successfully */ InventoryResponseDto;
export type InventoryControllerCreateApiArg = {
  createItemDto: CreateItemDto;
};
export type InventoryControllerFindAllApiResponse =
  /** status 200 Items retrieved successfully */ InventoryDto;
export type InventoryControllerFindAllApiArg = {
  /** Page number (default: 1) */
  page?: number;
  /** Items per page (default: 10) */
  limit?: number;
};
export type InventoryControllerFindOneApiResponse =
  /** status 200 Item retrieved successfully */ InventoryItemResponseDto;
export type InventoryControllerFindOneApiArg = {
  /** Inventory item ID */
  id: string;
};
export type InventoryControllerUpdateApiResponse =
  /** status 200 Item updated successfully */ InventoryResponseDto;
export type InventoryControllerUpdateApiArg = {
  /** Inventory item ID */
  id: string;
  createItemDto: CreateItemDto;
};
export type InventoryControllerRemoveApiResponse = unknown;
export type InventoryControllerRemoveApiArg = {
  /** Inventory item ID */
  id: string;
};
export type InventoryControllerUpdateStatusApiResponse =
  /** status 200 Item status updated successfully */ InventoryResponseDto;
export type InventoryControllerUpdateStatusApiArg = {
  /** Inventory item ID */
  id: string;
};
export type InventoryControllerCheckStockLevelsApiResponse =
  /** status 200 Stock levels checked successfully */ StockCheckDto;
export type InventoryControllerCheckStockLevelsApiArg = void;
export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock";
export type SimpleCategoryDto = {
  id: string;
  name: string;
  isActive: boolean;
};
export type InventoryResponseDto = {
  id: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
  cost: number;
  sku: string;
  isActive: boolean;
  status: InventoryStatus;
  minStockLevel: number;
  barcode: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: SimpleCategoryDto | null;
};
export type CreateItemDto = {
  name: string;
  image: string;
  description: string;
  quantity: number;
  cost: number;
  price: number;
  sku: string;
  minStockLevel: number;
  barcode: string;
  categoryId: string;
  status: InventoryStatus;
};
export type InventoryDto = {
  data: InventoryResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
export type InventoryItemResponseDto = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  tenantId: string;
  sku: string;
  categoryId: string;
  minStockLevel: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: SimpleCategoryDto | null;
};
export type StockCheckDto = {
  lowStock: InventoryResponseDto[];
};
export const {
  useInventoryControllerCreateMutation,
  useInventoryControllerFindAllQuery,
  useInventoryControllerFindOneQuery,
  useInventoryControllerUpdateMutation,
  useInventoryControllerRemoveMutation,
  useInventoryControllerUpdateStatusMutation,
  useInventoryControllerCheckStockLevelsQuery,
} = injectedRtkApi;
