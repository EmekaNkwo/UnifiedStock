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
        query: () => ({ url: `/api/inventory` }),
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
          body: queryArg.updateItemDto,
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
  /** status 200 Items retrieved successfully */ InventoryResponseDto[];
export type InventoryControllerFindAllApiArg = void;
export type InventoryControllerFindOneApiResponse =
  /** status 200 Item retrieved successfully */ InventoryResponseDto;
export type InventoryControllerFindOneApiArg = {
  /** Inventory item ID */
  id: string;
};
export type InventoryControllerUpdateApiResponse =
  /** status 200 Item updated successfully */ InventoryResponseDto;
export type InventoryControllerUpdateApiArg = {
  /** Inventory item ID */
  id: string;
  updateItemDto: UpdateItemDto;
};
export type InventoryControllerRemoveApiResponse = unknown;
export type InventoryControllerRemoveApiArg = {
  /** Inventory item ID */
  id: string;
};
export type InventoryControllerCheckStockLevelsApiResponse =
  /** status 200 Stock levels checked successfully */ StockCheckDto;
export type InventoryControllerCheckStockLevelsApiArg = void;
export type InventoryResponseDto = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  sku: string;
  minStockLevel: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateItemDto = {
  name: string;
  description: string;
  quantity: number;
  price: number;
  sku: string;
  minStockLevel: number;
  maxStockLevel: number;
  categoryId: string;
};
export type UpdateItemDto = {
  name: string;
  quantity: number;
  price: number;
  sku: string;
  minStockLevel: number;
  maxStockLevel: number;
  categoryId: string;
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
  useInventoryControllerCheckStockLevelsQuery,
} = injectedRtkApi;
