"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Lock, Mail, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  unauthorized?: boolean;
}

export default function LoginForm({ unauthorized = false }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setAuthError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.message?.toLowerCase().includes("email not confirmed")) {
        setAuthError(
          "Tu correo aún no está confirmado. Revisa tu bandeja de entrada (y spam) o pide al administrador que confirme tu cuenta."
        );
      } else {
        setAuthError("Credenciales incorrectas. Revisa el correo y la contraseña.");
      }
      return;
    }

    // Verificar que el usuario sea admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user!.id)
      .single();

    if (profile?.role !== "admin") {
      await supabase.auth.signOut();
      setAuthError("Acceso denegado. Este panel es solo para administradores.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Unauthorized access error */}
      {unauthorized && !authError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle
            className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-sm text-red-600 dark:text-red-400">
            Acceso denegado. Este panel es solo para administradores.
          </p>
        </div>
      )}

      {/* Auth error */}
      {authError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle
            className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-sm text-red-600 dark:text-red-400">{authError}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
            aria-hidden="true"
          />
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-100 ${
              errors.email
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-slate-200 dark:border-slate-700"
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <a
            href="#"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
            aria-hidden="true"
          />
          <input
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            className={`w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-100 ${
              errors.password
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-slate-200 dark:border-slate-700"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Eye className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember me */}
      <div className="flex items-center">
        <input
          {...register("rememberMe")}
          id="remember-me"
          type="checkbox"
          className="h-4 w-4 accent-primary border-slate-300 dark:border-slate-700 rounded transition-all"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
        >
          Remember me for 30 days
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {isSubmitting && (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        )}
        Sign in to Dashboard
      </button>
    </form>
  );
}
