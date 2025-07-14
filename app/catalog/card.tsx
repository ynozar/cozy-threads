import React, { useEffect, useState } from "react";
import axios from "axios";
import { CartItem, loadCart, saveCart } from "@/lib/cartHelper";

function Card({
  product,
}: {
  product: {
    images: string[];
    id: string;
    name: string;
    default_price: string;
    description: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [cartedQuantity, setCartedQuantity] = useState(0);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const imageUrl = product.images.length > 0 ? product.images[0] : undefined; //add default url
  const [cart] = useState<Map<string, CartItem>>(new Map());

  useEffect(() => {
    if (isModalOpen) {
      const current = loadCart();
      if (current) {
        current.forEach((v, k) => cart.set(k, v));
      } else {
        saveCart(cart); //initialize cart
      }

      const prod = cart.get(product.id);

      if (prod) {
        setAlreadyInCart(true);
        setCartedQuantity(prod.quantity);
        setQuantity(prod.quantity);
      }

      axios({
        method: "get",
        url: `/api/prices/${[product.default_price]}/`,
      }).then((r) => {
        console.log();
        setPrice(r.data.unit_amount);
      });
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const UpdateCart = () => {
    const p: CartItem = {
      id: product.id,
      name: product.name,
      quantity: quantity,
      price: price,
      price_id: product.default_price,
      image_url: product.images.length > 0 ? product.images[0] : undefined,
    };
    if (cart.has(p.id) && quantity == 0) {
      cart.delete(p.id);
    } else {
      cart.set(p.id, p);
    }
    saveCart(cart);
    setTimeout(() => {
      setAlreadyInCart(quantity > 0);
      setIsModalOpen(false);
      window.dispatchEvent(new Event("cart"));
    }, 750);
  };
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 sm:w-60 h-80 shadow-xl">
        <figure className="h-28 mt-4">
          <img
            className="h-28 align-middle "
            src={imageUrl}
            alt="Product Image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{generatePreview(product.description ?? "")}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-success" onClick={toggleModal}>
              View
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <label
              htmlFor="productModal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={toggleModal}
            >
              ✕
            </label>

            <figure className="place-items-center">
              <img src={imageUrl} alt="Product Image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="">{product.name}</p>
              <p className="text-sm">{product.description}</p>
              <div className="card-actions justify-end">
                <p className="text-xl font-semibold my-auto">
                  {price == 0 ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    `$${price / 100}`
                  )}
                </p>

                <div>
                  <div>
                    <input
                      className="w-24 md:w-full input input-bordered join-item"
                      defaultValue={quantity > 0 ? quantity : ""}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      placeholder="Quantity"
                    />
                  </div>
                </div>
                <button
                  disabled={
                    (quantity == 0 && !alreadyInCart) ||
                    quantity == cartedQuantity
                  }
                  className="btn btn-accent"
                  onClick={UpdateCart}
                >
                  {alreadyInCart ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function generatePreview(desc: string) {
  const max_length = 60;
  return desc.length > max_length
    ? desc.substring(0, max_length) + "..."
    : desc;
}

export default Card;
