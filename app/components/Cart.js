import React from "react";
import { Alert, Button, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Screen from "./Screen";
import CartCard from "./CartCard";

import { incremented, decremented, deleted, emptied } from "../store/cart";
import { productRemovedFromCart } from "../store/products";

function Cart () {
  
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <Screen style={styles.screen}>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        
        renderItem={({ item }) => (
          <CartCard
            id={item.id}
            title={item.title}
            price={"Rs." + item.price}
            image={item.image}
            counter={item.counter}
            onIncrement={() => {
              dispatch(incremented(item));
            }}
            onDecrement={() => {
              dispatch(decremented(item));
            }}
            onDelete={() => {
              dispatch(deleted(item));
              dispatch(productRemovedFromCart(item));
            }}
          />
        )}
      />

      <Button
        title="Proceed to Buy"
        onPress={() => {
            cart.forEach(product => {
              dispatch(productRemovedFromCart(product));
            });
            dispatch(emptied());
            Alert.alert("Thank you...", "Visit Again!");
          }
        }
      />
      
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    backgroundColor: "yellow",
  },
});

export default Cart;
