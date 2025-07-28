import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  images: string[];
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number, size: string) => void;
  decreaseQuantity: (id: number, size: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      // Check if item already exists with same id and size
      const existingIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        // Increment quantity by 1 only once
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Completely removes the item from cart
  const removeFromCart = (id: number, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Decreases quantity by 1, removes if quantity becomes 0
  const decreaseQuantity = (id: number, size: string) => {
    setCartItems((prevItems) => {
      // Find existing item index
      const existingIndex = prevItems.findIndex(
        (item) => item.id === id && item.size === size
      );
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingIndex].quantity > 1) {
          // Decrement quantity by 1 only once
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity - 1,
          };
          return updatedItems;
        } else {
          // Remove item if quantity is 1
          return prevItems.filter((item) => !(item.id === id && item.size === size));
        }
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        decreaseQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
