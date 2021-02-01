import React, {createContext, useState, useEffect} from 'react';

import {addItemToCart, clearItemFromCart, removeItemFromCart} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    cartItems: [],
    cartItemsCount: 0,
    total: 0,
    toggleHidden: () => {},
    addItem: (item) => {},
    removeItem: (item) => {},
    clearItem: (item) => {},
    clearAllItems: () => {},
});


const CartProvider = ({children}) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let i = 0;
        let runningTotal = 0;
        for(let cartItem of cartItems) {
            i += cartItem.quantity;
            runningTotal += cartItem.price * cartItem.quantity;
        }
        setCartItemsCount(i);
        setTotal(runningTotal);
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                hidden,
                cartItems,
                cartItemsCount,
                total,
                toggleHidden:   ()      => setHidden(!hidden),
                addItem:        (item)  => setCartItems(addItemToCart(cartItems, item)),
                removeItem:     (item)  => setCartItems(removeItemFromCart(cartItems, item)),
                clearItem:      (item)  => setCartItems(clearItemFromCart(cartItems, item)),
                clearAllItems:  ()      => setCartItems([])
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;