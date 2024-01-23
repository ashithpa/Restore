import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ApptextInput from "../../app/Components/AppTextInput";
import AppCheckbox from "../../app/Components/AppCheckBox";

export default function AddressForm() {
  const { control, formState } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          /> */}
          <ApptextInput
            control={control}
            name="fullName"
            label="Full name"
          ></ApptextInput>
        </Grid>
        <Grid item xs={12}>
          <ApptextInput
            control={control}
            name="address1"
            label="Address 1"
          ></ApptextInput>
        </Grid>
        <Grid item xs={12}>
          <ApptextInput
            control={control}
            name="address2"
            label="Address 2"
          ></ApptextInput>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ApptextInput
            control={control}
            name="city"
            label="City"
          ></ApptextInput>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ApptextInput
            control={control}
            name="state"
            label="State"
          ></ApptextInput>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ApptextInput control={control} name="zip" label="Zip"></ApptextInput>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ApptextInput
            control={control}
            name="country"
            label="Country"
          ></ApptextInput>
        </Grid>
        <Grid item xs={12}>
          {/* <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            /> */}
          <AppCheckbox
            name="saveAddress"
            label="Save this as the default address"
            controlled={control}
            disabled={!formState.isDirty}
          ></AppCheckbox>
        </Grid>
      </Grid>
    </>
  );
}
