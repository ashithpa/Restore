import { useAppSelector, useAppdispatch } from "../../app/store/configureStore";
import { useEffect } from "react";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/Components/RadioButtonGroup";
import CheckboxButtons from "../../app/Components/CheckboxButtons";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

export default function Catalog() {
  // const [products, SetProducts] = useState<Product[]>([]);
  // const [loading, SetLoading] = useState(true);

  const products = useAppSelector(productSelectors.selectAll);
  const {
    filtersLoaded,
    productsLoaded,
    status,
    brands,
    types,
    productParams,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppdispatch();

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/Products")
  //     .then((response) => response.json())
  //     .then((data) => SetProducts(data));
  // }, []);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    // agent.Catalog.list(
    //   .then((products) => SetProducts(products))
    //   .catch((error) => console.log(error))1
    //   .finally(() => SetLoading(false));
  }, [dispatch, productsLoaded]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading Product...."></LoadingComponent>;

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
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch></ProductSearch>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          ></RadioButtonGroup>
          {/* <FormControl component="fieldset">
            <RadioGroup>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label} key={value}
                />
              ))}
            </RadioGroup>
          </FormControl> */}
          {/* <RadioButtonGroup selectedValue=
          {productParams.or}></RadioButtonGroup> */}
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          ></CheckboxButtons>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
        {/* <FormGroup>
            {types.map((type) => (
              <FormControlLabel
                control={<Checkbox />}
                label={type}
                key={type}
              />
            ))}
          </FormGroup>   */}
           <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          ></CheckboxButtons>  
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}></ProductList>
      </Grid>
    </Grid>
  );
}
