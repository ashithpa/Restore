import { Grid, Typography } from "@mui/material";
import BasketTable from "../basket/BasketTable";
import BasketSummary from "../basket/basketSummary";
import { useAppSelector } from "../../app/store/configureStore";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {basket && (
        <BasketTable items={basket.items} isBasket={false}></BasketTable>
      )}
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary></BasketSummary>
        </Grid>
      </Grid>
    </>
  );
}
