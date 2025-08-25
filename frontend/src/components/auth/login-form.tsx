"use client";
import { cn } from "@/lib/utils";
import { CustomButton, CustomInput } from "@/shared/custom-ui";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { useAuthControllerLoginMutation } from "@/redux/services/auth-api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-utils";
import { useCrud } from "@/hooks/use-crud";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/shared/zod-schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { setCrudState } = useCrud();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string }>({
    resolver: zodResolver(loginSchema),
  });

  const [login, setLoginMutation] = useAuthControllerLoginMutation();

  const onSubmit = async (data: { username: string }) => {
    await login({
      loginDto: {
        username: data.username,
      },
    });
  };

  useEffect(() => {
    if (setLoginMutation.isSuccess) {
      localStorage.setItem("accessToken", setLoginMutation?.data?.access_token);
      setCrudState({ userProfile: setLoginMutation?.data?.user });
      toast.success("Login successful");
      const tenant = setLoginMutation?.data?.user?.tenant?.slug;
      router.push(`/${tenant}/dashboard`);
    } else if (setLoginMutation.isError) {
      handleApiError(setLoginMutation.error);
    }
  }, [setLoginMutation.isSuccess, setLoginMutation.error]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="text-center flex items-center justify-center">
        <Label className="text-2xl font-bold text-center">Welcome Back</Label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <CustomInput
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              icon={User}
              error={errors}
              registration={register("username")}
              required
            />
          </div>
          <CustomButton
            type="submit"
            label="Sign In"
            isLoading={setLoginMutation.isLoading}
          />
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
