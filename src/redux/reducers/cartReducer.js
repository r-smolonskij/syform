import { v4 as uuidv4 } from "uuid";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  UPDATE_CART_PRODUCTS
} from "../actions/cartActions";
import _ from 'lodash'

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;

  if (action.type === ADD_TO_CART) {
    // for non variant products
    if (product.variation === undefined) {
      const cartItem = cartItems.filter((item) => item.id === product.id)[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4()
          }
        ];
      } else {
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
              ...item,
              quantity: product.quantity
                ? item.quantity + product.quantity
                : item.quantity + 1
            }
            : item
        );
      }
      // for variant products
    } else {
      const cartItem = cartItems.filter(
        (item) =>
          item.id === product.id &&
          product.selectedProductColor &&
          product.selectedProductColor === item.selectedProductColor &&
          product.selectedProductSize &&
          product.selectedProductSize === item.selectedProductSize &&
          (product.cartItemId ? product.cartItemId === item.cartItemId : true)
      )[0];

      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4()
          }
        ];
      } else if (
        cartItem !== undefined &&
        (cartItem.selectedProductColor !== product.selectedProductColor ||
          cartItem.selectedProductSize !== product.selectedProductSize)
      ) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4()
          }
        ];
      } else {
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
              ...item,
              quantity: product.quantity
                ? item.quantity + product.quantity
                : item.quantity + 1,
              selectedProductColor: product.selectedProductColor,
              selectedProductSize: product.selectedProductSize
            }
            : item
        );
      }
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          (cartItem) => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter(
        (cartItem) => cartItem.cartItemId !== product.cartItemId
      );
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter((item) => {
      return false;
    });
  }

  if (action.type === UPDATE_CART_PRODUCTS) {
    let newCartItems = [];
    _.forEach(cartItems, item => {
      const foundItem = _.find(action.payload, product => _.isEqual(product.id, item.id));
      if (foundItem && foundItem.isAvailable) {
        const itemCopy = { ...item };
        itemCopy.categoryId = foundItem.categoryId;
        itemCopy.categoryName = foundItem.categoryName;
        itemCopy.description = foundItem.description;
        itemCopy.image = foundItem.image;
        itemCopy.name = foundItem.name;
        itemCopy.price = foundItem.price;
        itemCopy.usageInfo = foundItem.usageInfo;
        newCartItems.push(itemCopy)
      }
    })
    return [...newCartItems];
  }

  return state;
};

export default cartReducer;
