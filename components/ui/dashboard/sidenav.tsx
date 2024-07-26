"use client";
import {
  BlocksIcon,
  LogOutIcon,
  MenuIcon,
  Users,
  WashingMachineIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Sidenav = () => {
  return (
    <>
      <div className="flex w-full h-full flex-col border-r lg:block dark:bg-gray-800/40">
        <div className=" flex h-20 items-center justify-between px-4 md:h-20 w-screen md:w-full bg-slate-900">
          <div className=" text-white md:w-40">
          <img
              className="flex w-auto h-auto "
              src="/assets/images/fibbo-nobg.png"
              alt="logo"
            />
          </div>

          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger className="text-[#27c8bd]">
                <MenuIcon size={42} />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <p>Fibbo</p>
                  </SheetTitle>
                  <SheetDescription>Portal administrativo</SheetDescription>

                  <ul className="antialiased flex flex-col md:flex-col gap-3 mt-4">
                    <li>
                      <small className="flex gap-2 mb-3">Dashboard</small>
                      <Link
                        className="hover:bg-[#2ed5de] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                        href="/dashboard/"
                      >
                        <SheetClose className="flex gap-2 w-full">
                          <Users size={18} /> Users
                        </SheetClose>
                      </Link>
                    </li>

                    <li className="hidden md:block">
                      <Link
                        className=" hover:bg-red-400 hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-bold text-sm text-red-400 flex gap-2 md:mt-20 md:fixed md:bottom-10  md:w-64"
                        href="/"
                      >
                        <LogOutIcon size={18} /> Sair
                      </Link>
                    </li>
                  </ul>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="hidden md:flex md:flex-col ml-4 mt-8">
          <ul className="antialiased flex md:flex-col gap-3">
            <li>
              <small className="flex gap-2 mb-3">Dashboard</small>
              <Link
                className="hover:bg-[#20c9e0] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                href="/dashboard/"
              >
                <Users size={18} /> Users
              </Link>
            </li>
            <li className="hidden md:block">
              <Link
                className=" hover:bg-red-400 hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-bold text-sm text-red-400 flex gap-2 md:mt-20 md:fixed md:bottom-10  md:w-64"
                href="/"
              >
                <LogOutIcon size={18} /> Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
