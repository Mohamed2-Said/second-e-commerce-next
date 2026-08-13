"use client";
import React, { useContext, useState } from "react";
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
import {
  ShoppingCartIcon,
  UserIcon,
  Menu,
  X,
  Loader2,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cartcontext } from "../context/context";
import { signOut, useSession } from "next-auth/react";

export default function Navber() {
  const { CartData, isLoading } = useContext(Cartcontext);
  const session = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-300 py-4 text-2xl font-semibold sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1>
            <Link href="/">ShopMart</Link>
          </h1>

          {/* Desktop Links */}
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

          {/* Icons + User + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {session.status == "authenticated" && (
              <Link href={"/wishlist"} className="relative w-fit">
                <Heart className="w-6 h-6 hover:text-red-500 transition" />
              </Link>
            )}

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

            {/* Dropdown User */}
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0 cursor-pointer">
                <UserIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {session.status == "authenticated" ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
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
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="w-full cursor-pointer">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/regiester" className="w-full cursor-pointer">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <Button
                size="icon"
                variant="ghost"
                className="cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-2 bg-gray-200 p-4 rounded-xl shadow-inner transition-all">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 text-xl font-medium hover:bg-gray-300 rounded-md"
            >
              Products
            </Link>
            <Link
              href="/brands"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 text-xl font-medium hover:bg-gray-300 rounded-md"
            >
              Brands
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 text-xl font-medium hover:bg-gray-300 rounded-md"
            >
              Categories
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
