export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  price_id: string;
  image_url: string | undefined;
}

export const saveCart = (cart: Map<string, CartItem>): void => {
  try {
    const cartObject = Array.from(cart.entries());
    localStorage.setItem("cart", JSON.stringify(cartObject));
  } catch (error) {
    console.error("Error saving cart to localStorage", error);
  }
};

export const loadCart = (): Map<string, CartItem> | null => {
  try {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      const cartArray: [string, CartItem][] = JSON.parse(cartString);
      console.log(cartArray);
      const x = new Map(cartArray);
      console.log(x);
      return x;
    }
    return null;
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return null;
  }
};

export const getCartStats = (): [number, number] => {
  try {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      const cartArray: [string, CartItem][] = JSON.parse(cartString);
      const map = new Map(cartArray);
      let count = 0;
      let total = 0;
      map.forEach((item) => {
        total += item.price * item.quantity;
        count += item.quantity;
      });
      return [count, total / 100];
    }
    return [0, 0];
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return [0, 0];
  }
};
