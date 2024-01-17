import { useAppSelector, useAppdispatch } from "../../app/store/configureStore";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";

export default function Catalog() {
  // const [products, SetProducts] = useState<Product[]>([]);
  // const [loading, SetLoading] = useState(true);

  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppdispatch();

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/Products")
  //     .then((response) => response.json())
  //     .then((data) => SetProducts(data));
  // }, []);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    // agent.Catalog.list(
    //   .then((products) => SetProducts(products))
    //   .catch((error) => console.log(error))1
    //   .finally(() => SetLoading(false));
  }, [dispatch, productsLoaded]);

  if (status.includes('pending')) return <LoadingComponent></LoadingComponent>;

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
