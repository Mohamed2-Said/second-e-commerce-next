"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react"; // 👈 استيراد مهم لجلب التوكن المحدث

const formSchema = z.object({
  details: z
    .string()
    .min(5, "Address details must be at least 5 characters long."),
  city: z.string().min(2, "City name is too short."),
  phone: z
    .string()
    .regex(/^01[0-9]{9}$/, "Phone must be a valid Egyptian number."),
});

type FormData = z.infer<typeof formSchema>;

export default function CheckoutMohamed({ cartId }: { cartId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function Checkout(data: FormData) {
    // 🔍 جلب الجلسة المحدثة مباشرة من السيرفر لضمان الحصول على توكن صالح
    const session = await getSession();

    const userToken =
      (session as any)?.token || (session?.user as any)?.token || "";

    console.log("🔑 Token used for checkout:", userToken);

    if (!userToken) {
      toast.error("Session expired or token missing. Please login again.", {
        id: "checkout",
      });
      return;
    }

    try {
      toast.loading("Processing your order...", { id: "checkout" });

      const shippingAddress = {
        details: data.details,
        phone: data.phone,
        city: data.city,
      };

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(
          "http://localhost:3000",
        )}`,
        {
          method: "POST",
          body: JSON.stringify({ shippingAddress }),
          headers: {
            token: userToken, // 👈 استخدام التوكن المضمون
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();
      console.log("Checkout API response:", result);

      if (!response.ok) {
        toast.error(result?.message || "Checkout failed", { id: "checkout" });
        return;
      }

      const paymentUrl = result?.url || result?.session?.url;

      if (paymentUrl) {
        toast.success("Redirecting to payment...", { id: "checkout" });
        window.location.href = paymentUrl;
      } else {
        toast.success("Order created successfully ✅", { id: "checkout" });
      }

      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        id: "checkout",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full py-6 rounded-xl bg-gray-900 text-white font-medium shadow-lg cursor-pointer">
          Proceed to Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(Checkout)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
            <DialogDescription>
              Please enter your shipping information.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="details">Address Details</Label>
            <Input id="details" {...register("details")} />
            {errors.details && (
              <p className="text-red-500 text-sm">{errors.details.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Save & Checkout"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
