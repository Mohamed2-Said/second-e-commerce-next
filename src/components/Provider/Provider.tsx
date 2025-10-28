"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import Footer from "../Footer/Footer";
import { Button } from "@/components/ui/button";
import Navber from "../Navber/Navber";
import Cartcontextprovider from "../context/context";
import { Toaster } from "react-hot-toast";
import RouteLoader from "@/components/GlabelLoading/RouteLoader";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <Cartcontextprovider>
          <RouteLoader>
            <Navber />
            <main className="container mx-auto py-4">
              <Toaster />
              {children}
            </main>
            <Footer />
          </RouteLoader>
        </Cartcontextprovider>
      </SessionProvider>
    </>
  );
}
