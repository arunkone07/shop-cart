import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import Products from "./app/components/Products";
import Cart from "./app/components/Cart";

import configureStore from "./app/store/configureStore";

const store = configureStore();

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Products" component={Products} />
    <Tab.Screen name="Cart" component={Cart} />
  </Tab.Navigator>
);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;