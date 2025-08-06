import { baseApi as api } from "./base-api";
export const addTagTypes = ["Auth"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      authControllerSignup: build.mutation<
        AuthControllerSignupApiResponse,
        AuthControllerSignupApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/signup`,
          method: "POST",
          body: queryArg.signUpDto,
        }),
        invalidatesTags: ["Auth"],
      }),
      authControllerLogin: build.mutation<
        AuthControllerLoginApiResponse,
        AuthControllerLoginApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/login`,
          method: "POST",
          body: queryArg.loginDto,
        }),
        invalidatesTags: ["Auth"],
      }),
      authControllerGetProfile: build.query<
        AuthControllerGetProfileApiResponse,
        AuthControllerGetProfileApiArg
      >({
        query: () => ({ url: `/api/auth/profile` }),
        providesTags: ["Auth"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as authApi };
export type AuthControllerSignupApiResponse =
  /** status 201 User registered successfully */ RegisterResponseDto;
export type AuthControllerSignupApiArg = {
  signUpDto: SignUpDto;
};
export type AuthControllerLoginApiResponse =
  /** status 200 User logged in successfully */ LoginResponseDto;
export type AuthControllerLoginApiArg = {
  loginDto: LoginDto;
};
export type AuthControllerGetProfileApiResponse =
  /** status 200 User profile retrieved successfully */ ProfileResponseDto;
export type AuthControllerGetProfileApiArg = void;
export type TenantResponseDto = {
  id: string;
  name: string;
  slug: string;
};
export type UserResponseDto = {
  id: string;
  username: string;
  role: string;
  tenant: TenantResponseDto;
};
export type RegisterResponseDto = {
  user: UserResponseDto;
  access_token: string;
};
export type SignUpDto = {
  username: string;
  role: string;
  tenantName: string;
};
export type LoginResponseDto = {
  user: UserResponseDto;
  access_token: string;
};
export type LoginDto = {
  username: string;
};
export type ProfileResponseDto = {
  data: UserResponseDto;
};
export const {
  useAuthControllerSignupMutation,
  useAuthControllerLoginMutation,
  useAuthControllerGetProfileQuery,
} = injectedRtkApi;
