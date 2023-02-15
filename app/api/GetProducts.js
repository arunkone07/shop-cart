import client from "./client";

const endpoint = "/sampleData";
const getProducts = () => client.get(endpoint);

export default {
  getProducts,
};
