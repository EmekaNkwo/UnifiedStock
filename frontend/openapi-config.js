/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */

const config = {
  schemaFile: "openapi.json",
  apiFile: `./src/redux/services/base-api.ts`,
  apiImport: "baseApi",
  outputFiles: {
    "./src/redux/services/auth-api.ts": {
      filterEndpoints: [/AuthController/i],
      exportName: "authApi",
      tag: true,
    },
    "./src/redux/services/tenant-api.ts": {
      filterEndpoints: [/TenantController/i],
      exportName: "tenantApi",
      tag: true,
    },
    "./src/redux/services/category-api.ts": {
      filterEndpoints: [/CategoryController/i],
      exportName: "categoryApi",
      tag: true,
    },
    "./src/redux/services/inventory-api.ts": {
      filterEndpoints: [/InventoryController/i],
      exportName: "inventoryApi",
      tag: true,
    },
  },
  hooks: true,
};

module.exports = config;
