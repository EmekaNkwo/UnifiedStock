import { baseApi as api } from "./base-api";
export const addTagTypes = ["tenants"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      tenantControllerCreate: build.mutation<
        TenantControllerCreateApiResponse,
        TenantControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/tenants`,
          method: "POST",
          body: queryArg.createTenantDto,
        }),
        invalidatesTags: ["tenants"],
      }),
      tenantControllerFindAll: build.query<
        TenantControllerFindAllApiResponse,
        TenantControllerFindAllApiArg
      >({
        query: () => ({ url: `/api/tenants` }),
        providesTags: ["tenants"],
      }),
      tenantControllerFindOne: build.query<
        TenantControllerFindOneApiResponse,
        TenantControllerFindOneApiArg
      >({
        query: (queryArg) => ({ url: `/api/tenants/${queryArg.id}` }),
        providesTags: ["tenants"],
      }),
      tenantControllerUpdate: build.mutation<
        TenantControllerUpdateApiResponse,
        TenantControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/tenants/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateTenantDto,
        }),
        invalidatesTags: ["tenants"],
      }),
      tenantControllerRemove: build.mutation<
        TenantControllerRemoveApiResponse,
        TenantControllerRemoveApiArg
      >({
        query: (queryArg) => ({
          url: `/api/tenants/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["tenants"],
      }),
      tenantControllerGetTenantBySlug: build.query<
        TenantControllerGetTenantBySlugApiResponse,
        TenantControllerGetTenantBySlugApiArg
      >({
        query: (queryArg) => ({ url: `/api/tenants/by-slug/${queryArg.slug}` }),
        providesTags: ["tenants"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as tenantApi };
export type TenantControllerCreateApiResponse =
  /** status 201 The tenant has been successfully created. */ Tenant;
export type TenantControllerCreateApiArg = {
  createTenantDto: CreateTenantDto;
};
export type TenantControllerFindAllApiResponse =
  /** status 200 Return all tenants. */ Tenant[];
export type TenantControllerFindAllApiArg = void;
export type TenantControllerFindOneApiResponse =
  /** status 200 Return the tenant. */ Tenant;
export type TenantControllerFindOneApiArg = {
  id: string;
};
export type TenantControllerUpdateApiResponse =
  /** status 200 The tenant has been successfully updated. */ Tenant;
export type TenantControllerUpdateApiArg = {
  id: string;
  updateTenantDto: UpdateTenantDto;
};
export type TenantControllerRemoveApiResponse = unknown;
export type TenantControllerRemoveApiArg = {
  id: string;
};
export type TenantControllerGetTenantBySlugApiResponse =
  /** status 200 Return the tenant. */ Tenant;
export type TenantControllerGetTenantBySlugApiArg = {
  slug: string;
};
export type Tenant = {};
export type CreateTenantDto = {};
export type UpdateTenantDto = {};
export const {
  useTenantControllerCreateMutation,
  useTenantControllerFindAllQuery,
  useTenantControllerFindOneQuery,
  useTenantControllerUpdateMutation,
  useTenantControllerRemoveMutation,
  useTenantControllerGetTenantBySlugQuery,
} = injectedRtkApi;
