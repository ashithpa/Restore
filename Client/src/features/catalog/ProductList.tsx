import { Grid } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <>
      {/* <List>
        {products.map((product) => (
         <ProductCard product={product}></ProductCard>
        ))}
      </List> */}

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={3} key={product.id}>
            <ProductCard product={product}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
