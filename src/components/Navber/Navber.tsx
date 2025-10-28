"use client";
import React, { useContext } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCartIcon, UserIcon, Menu, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cartcontext } from "../context/context";
import { signOut, useSession } from "next-auth/react";

export default function Navber() {
  const { CartData, isLoading } = useContext(Cartcontext);
  const session = useSession();
  console.log(session);

  return (
    <nav className="bg-gray-300 py-4 text-2xl font-semibold sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1>
            <Link href="/">ShopMart</Link>
          </h1>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Icons + User + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Dropdown User */}
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0">
                <UserIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {session.status == "authenticated" ? (
                  <>
                    <Link href="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>{" "}
                    <DropdownMenuItem
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>
                    <Link href="/regiester">
                      <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            {session.status == "authenticated" && (
              <Link href={"/cart"} className="relative w-fit">
                <ShoppingCartIcon className="w-6 h-6" />
                <span className="absolute -top-2.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-mono text-white">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    CartData?.numOfCartItems
                  )}
                </span>
              </Link>
            )}

            {/* Mobile Menu (Dropdown) */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 p-2 rounded-xl shadow-lg bg-white"
                >
                  <Link href="/products">
                    <DropdownMenuItem className="w-full py-3 text-lg font-medium hover:bg-green-100 rounded-md">
                      Products
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/brands">
                    <DropdownMenuItem className="w-full py-3 text-lg font-medium hover:bg-green-100 rounded-md">
                      Brands
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/categories">
                    <DropdownMenuItem className="w-full py-3 text-lg font-medium hover:bg-green-100 rounded-md">
                      Categories
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
