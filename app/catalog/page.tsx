"use client";
import Card from "@/app/catalog/card";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CartItem, loadCart, saveCart } from "@/lib/cartHelper";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart] = useState<Map<string, CartItem>>(new Map());

  useEffect(() => {
    const current = loadCart();

    if (current) {
      current.forEach((v, k) => cart.set(k, v));
    } else {
      saveCart(cart); //initialize cart
    }
    axios({
      method: "get",
      url: "/api/products/",
    }).then((r) => {
      console.log(r.data);
      setProducts(r.data.data);
    });
  }, []);

  return (
    <>
      <div className="bg-base-200">
        <div className="container mx-auto px-4 min-h-screen justify-items-center">
          <br />{" "}
          <h1 className="text-3xl font-semibold my-4 p-3">Our Catalog</h1>
          <div>
            <img className="mx-auto" src="/catalog.webp" />
            <br />

            <p className="text-center">
              Explore our wonderful catalog of cozy threads! We’ve got the
              softest sweaters, the coziest hoodies, and more. Treat yourself to
              something extra cozy today!
            </p>
          </div>
          <div className="divider w-3/4 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  xl:grid-cols-4 lg:gap-6 py-6 justify-items-center">
            {products.map((item: never, index: number) => (
              <div key={index}>
                <Card product={item}></Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
