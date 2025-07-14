"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const OrderSuccessPage = () => {
  useEffect(() => {
    localStorage.clear();
    window.dispatchEvent(new Event("cart"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="card max-w-md w-full  bg-base-200 shadow-xl  p-8">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
            className="h-16 w-16 text-green-500 mx-auto mb-4"
          >
            <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
          <h2 className="text-2xl font-semibold ">Thank you for your order!</h2>
          <p className="">Your order has been successfully placed.</p>
        </div>
        <div className="space-y-4">
          <div className="text-center mt-6">
            <Link href="/" className="btn btn-success w-full">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
