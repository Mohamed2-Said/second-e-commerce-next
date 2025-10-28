"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

type FormFields = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
    ),
});

export function Loginform() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormFields) {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        callbackUrl: "/",
        redirect: true,
        email: values.email,
        password: values.password,
      });

      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 w-sm">
      <Form {...form}>
        {searchParams.get("error") && (
          <h1 className="text-destructive text-2xl text-center py-3">
            {searchParams.get("error")}
          </h1>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ali@example.com"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mohamed@23.10.2004"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading} // يعطل الزرار أثناء التحميل
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Logging in...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
