// app/register/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

/**
 * Zod schema
 */
const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(7, "Phone is too short")
      .max(20, "Phone is too long")
      .regex(/^[0-9+()\-.\s]*$/, "Phone contains invalid characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  });

  async function onSubmit(values: SignupForm) {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            rePassword: values.rePassword,
            phone: values.phone,
          }),
        }
      );

      const data = await res.json();

      // Debugging log (remove in production)
      // console.log("signup response:", res.status, data);

      if (!res.ok) {
        // If server returns validation errors or message, show them
        const serverMessage =
          data?.message ||
          data?.msg ||
          (typeof data === "string" ? data : "Signup failed");
        // If server returns object of field errors, map them to fields
        if (data?.errors && typeof data.errors === "object") {
          // example structure { email: "exists", ... }
          Object.entries(data.errors).forEach(([field, msg]) => {
            // setError from react-hook-form
            form.setError(field as keyof SignupForm, {
              type: "server",
              message: Array.isArray(msg) ? msg.join(", ") : (msg as string),
            });
          });
        } else {
          toast.error(serverMessage);
        }
        setLoading(false);
        return;
      }

      // success
      toast.success(data?.message || "Account created successfully");
      form.reset();
      // redirect to login page
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create an account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ahmed Abd Al-Muti" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01010700701" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Strong password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </Card>
    </div>
  );
}
