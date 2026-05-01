import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {loginSchema , registerSchema} from "../schema"

import {AuthValues} from "../type"

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const loginMutation = useLogin();
  const registerMutation = useRegister();
 
  const navigate = useNavigate();
  const isLogin = mode === "login";

  const {
    register: reg,
    handleSubmit,
    formState: { errors, isSubmitting },
  
  } = useForm<AuthValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<AuthValues> = async (data) => {
    if (isLogin) {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
    } else {
      await registerMutation.mutateAsync({
        name: data.name || "",
        email: data.email,
        password: data.password,
      });
    }
    navigate("/overview");
  };

  // const switchMode = () => { setMode(isLogin ? 'register' : 'login'); reset() }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/4 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-primary mb-4 shadow-xl shadow-primary/20">
            <span className="text-white font-headline font-bold text-lg">
              S
            </span>
          </div>
          <h1 className="font-headline text-2xl font-bold text-primary">
            Studio Core
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            The Digital Curator — Management Console
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-low rounded-2xl p-8 glow-primary">
          <h2 className="font-headline text-xl font-semibold mb-1">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-on-surface-variant text-sm mb-6">
            {isLogin
              ? "Sign in to manage your portfolio."
              : "Start curating your digital presence."}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* {!isLogin && (
              <Input
                label="Full Name"
                placeholder="Alex Rivard"
                error={errors.name?.message}
                {...reg('name')}
              />
            )} */}
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...reg("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...reg("password")}
            />
            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...reg("confirmPassword")}
              />
            )}
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Please wait…"
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>

          {/* <p className="text-center text-sm text-on-surface-variant mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={switchMode} className="text-primary hover:text-primary-fixed font-semibold transition-colors">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p> */}
        </div>

        <p className="text-center text-[10px] text-on-surface-variant/40 mt-6 uppercase tracking-widest">
          © 2024 Digital Curator Portfolio. Built with precision.
        </p>
      </div>
    </div>
  );
}
