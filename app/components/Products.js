import React, { useEffect } from "react";

import { FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Screen from "./Screen";
import ProductCard from "./ProductCard";

import { productAdded, productAddedToCart } from "../store/products";
import { product2Cart } from "../store/cart";

import productsApi from "../api/products";

function Products() {

  const dispatch = useDispatch();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await productsApi.getProducts();
    response.data.forEach((product) => dispatch(productAdded(product)))
  };

  
  const allProducts = useSelector((state) => state.products)

  return (
    <Screen style={styles.screen}>

      <FlatList
        data={allProducts}
        keyExtractor={(product) => product.id.toString()}

        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            price={"Rs." + item.price}
            image={item.image}
            counter={item.counter}
            onAdd={() => {
              dispatch(product2Cart(item));
              dispatch(productAddedToCart(item))
            }}
          />
        )}
        
      />

      {/* can use below button for navigation in case of Stack Navigator 
        <Button
          title="Go to Cart"
          onPress={() => navigation.navigate("Cart", { addedProducts })}
        /> 
      */}

    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    backgroundColor: "yellow",
  },
});

export default Products;
