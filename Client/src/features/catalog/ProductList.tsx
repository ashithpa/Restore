import { Grid } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <>
      {/* <List>
        {products.map((product) => (
         <ProductCard product={product}></ProductCard>
        ))}
      </List> */}

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={4} key={product.id}>
            {!productsLoaded ? (
              <ProductCardSkeleton></ProductCardSkeleton>
            ) : (
              <ProductCard product={product}></ProductCard>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
