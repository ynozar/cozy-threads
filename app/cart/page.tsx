"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Checkout from "@/app/cart/checkout";
import { CartItem, loadCart, saveCart } from "@/lib/cartHelper";

const App = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
  const [cart, setCart] = useState<Map<string, CartItem>>(new Map());
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [checkingOut, setCheckingOut] = useState(false);
  useEffect(() => {
    const current = loadCart();

    if (current) {
      current.forEach((v, k) => cart.set(k, v));
    } else {
      saveCart(cart);
    }
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setDarkTheme(e.matches);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkTheme(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleThemeChange);

    let x = 0,
      y = 0;
    cart.forEach((e) => {
      x += e.price * e.quantity;
      y += e.quantity;
    });
    setTotalPrice(x);
    setQuantity(y);

    if (checkingOut) {
      axios({
        method: "post",
        url: "/api/checkout/payment-intent",
        data: Array.from(cart.values()),
      }).then((r) => {
        setTotalPrice(r.data.total);
        setClientSecret(r.data.clientSecret);
        setQuantity(r.data.quantity);
        console.log(r.data);
      });
    }
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [cart, checkingOut]);

  const removeFromCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Removing: ", event.currentTarget.id);
    const updatedCart = new Map(cart); // Create a copy of the current map
    updatedCart.delete(event.currentTarget.id); // Remove the item
    setCart(updatedCart);
    saveCart(updatedCart);
    window.dispatchEvent(new Event("cart"));
  };

  return (
    <>
      <div className=" min-h-screen bg-base-200">
        <div className="flex flex-col lg:flex-row mx-2 p-6">
          <div className="w-full">
            <h1 className="text-3xl font-semibold mb-4 p-3">Shopping Cart</h1>
            <div className="">
              <table className="table w-full">
                <thead>
                  <tr className="border-b-1 border-gray-300">
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th className="max-sm:hidden">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(cart.values()).map((item: CartItem) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-200 hover:dark:bg-gray-700 border-b-1 border-gray-300"
                    >
                      <td>{item.name}</td>
                      <td>{item.price / 100}</td>
                      <td className="">{item.quantity}</td>
                      <td className="max-sm:hidden">
                        {((item.price / 100) * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <button
                          disabled={checkingOut}
                          id={item.id}
                          className="btn btn-error btn-sm"
                          onClick={removeFromCart}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={`flex justify-between mt-4 `}>
                <div>
                  <h3 className="text-lg font-semibold">Cart Summary</h3>
                  <p>Total Items: {quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">
                    Total: ${(totalPrice / 100).toFixed(2)}
                  </p>
                  <button
                    disabled={cart.size == 0}
                    className={`btn  mt-2 ${checkingOut ? "btn-warning" : "btn-success"}`}
                    onClick={() => setCheckingOut(!checkingOut)}
                  >
                    {checkingOut ? "Edit Cart" : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
          {checkingOut && clientSecret != "" ? (
            <div id="checkout" className="lg:pl-8 lg:w-2/3 ">
              <br className="lg:hidden" />
              <Checkout clientSecret={clientSecret} darkTheme={darkTheme} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
