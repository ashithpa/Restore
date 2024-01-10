import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function Catalog() {
  const [products, SetProducts] = useState<Product[]>([]);
  const [loading, SetLoading] = useState(true);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/Products")
  //     .then((response) => response.json())
  //     .then((data) => SetProducts(data));
  // }, []);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => SetProducts(products))
      .catch((error) => console.log(error))
      .finally(() => SetLoading(false));
  }, []);

  if (loading) return <LoadingComponent></LoadingComponent>;

  // function addProducts() {
  //   // SetProducts([...products, {name:"product3", price:500}])
  //   SetProducts((prevState) => [
  //     ...prevState,
  //     {
  //       id: prevState.length + 101,
  //       name: "product" + (prevState.length + 1),
  //       price: prevState.length * 100 + 100,
  //       brand: "some brand",
  //       description: "some description",
  //       pictureUrl: "http://picsum.photos/200",
  //     },
  //   ]);
  // }

  return (
    <>
      <ProductList products={products}></ProductList>
      {/* <Button variant="contained" onClick={addProducts}>Add Product</Button> */}
    </>
  );
}
