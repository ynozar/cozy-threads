"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCartStats } from "@/lib/cartHelper";

function Navbar() {
  const [itemCount, setItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    setIsPWA(window.matchMedia("(display-mode: standalone)").matches);
    const x: [number, number] = getCartStats();
    setItemCount(x[0]);
    setCartTotal(x[1]);
    const handleStorageChange = (event: Event) => {
      if (event.type === "cart") {
        const x: [number, number] = getCartStats();
        setItemCount(x[0]);
        setCartTotal(x[1]);
      }
    };

    window.addEventListener("cart", handleStorageChange);

    return () => {
      window.removeEventListener("cart", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div
        className={`navbar shadow-xl fixed top-0 left-0 w-full z-50 ${isPWA ? "bg-[#22543d]" : "bg-base-100 "}`}
      >
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Cozy Threads
          </Link>
        </div>
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/catalog">
              <b>Catalog</b>
            </a>
          </li>
        </ul>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span
                  className={`badge badge-success badge-sm indicator-item ${itemCount == 0 ? "opacity-0" : ""}`}
                >
                  {itemCount}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">
                  {itemCount} Item{itemCount != 1 ? "s" : ""}
                </span>
                <span className="">
                  Total: ${cartTotal.toFixed(2)}
                </span>
                <div className="card-actions">
                  <a href="/cart" className="btn btn-success  btn-block">
                    View cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-12 opacity-0"></div>
    </>
  );
}

export default Navbar;
