import { TextField, debounce } from "@mui/material";
import { useAppSelector, useAppdispatch } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppdispatch();
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <TextField
      label="search Products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    ></TextField>
  );
}
