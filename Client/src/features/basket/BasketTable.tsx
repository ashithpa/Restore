import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { useAppSelector, useAppdispatch } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  console.log(items);
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppdispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <h1></h1>
                <Box display="flex" alignItems="center">
                  <img
                  // src="/Client/public/images/hero1.jpg"
                    src={item.pictureURL}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  ></img>
                  {item.name}
                </Box>
              </TableCell>
              <TableCell align="right">${item.price / 100}</TableCell>
              <TableCell align="center">
                {isBasket && (
                  <LoadingButton
                    color="error"
                    loading={
                      status === "pendingRemoveItem" + item.productId + "rem"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          name: "rem",
                        })
                      )
                    }
                  >
                    <Remove></Remove>
                  </LoadingButton>
                )}
                {item.quantity}
                {isBasket && (
                  <LoadingButton
                    color="secondary"
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                        })
                      )
                    }
                  >
                    <Add></Add>
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                ${(item.price / 100) * item.quantity}
              </TableCell>
              {isBasket && (
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      // handleRemoveItem(
                      //   item.productId,
                      //   item.quantity,
                      //   "del" + item.productId
                      // )
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                  >
                    <Delete></Delete>
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
