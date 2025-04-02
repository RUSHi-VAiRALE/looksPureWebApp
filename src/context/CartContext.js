'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product, quantity, selectedShade) => {
    setCart(prevCart => {
      // Check if product with same ID and shade already exists in cart
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.selectedShade.id === selectedShade.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item to cart
        return [...prevCart, {
          id: product.id,
          name: product.name,
          subtitle: product.subtitle,
          price: product.price,
          image: product.images[0].src,
          quantity,
          selectedShade
        }];
      }
    });
    
    // Open cart drawer when adding items
    //setCartOpen(true);
  };
  
  const removeFromCart = (productId, shadeId) => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === productId && item.selectedShade.id === shadeId))
    );
  };
  
  const updateQuantity = (productId, shadeId, newQuantity) => {
    if (newQuantity < 1) {setCart(prevCart => 
      prevCart.filter(item => !(item.id === productId && item.selectedShade.id === shadeId))
    )
    return;
  }
    
    setCart(prevCart => 
      prevCart.map(item => 
        (item.id === productId && item.selectedShade.id === shadeId)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}