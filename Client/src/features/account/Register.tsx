import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
// import { useAppdispatch } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Register() {
  const navigate = useNavigate();
  //   const dispatch = useAppdispatch();
  //   const [validationErrors, setValidationErrors] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  function handleAPIErrors(errors: any) {
    // debugger;
    console.log(errors);
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Passwords")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
            .then(() => {
              toast.success("Registration successfull - you can login now!");
              navigate("/login");
            })
            .catch((error) => handleAPIErrors(error))
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoComplete="username"
          autoFocus
          {...register("username", { required: "User Name is required" })}
          error={!!errors.username}
          helperText={errors.username && errors.username.message?.toString()}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          autoComplete="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: "Not a valid Email.",
            },
          })}
          error={!!errors.email}
          //  helperText={errors?.email?.message}
          //helperText={`${errors?.email?.message}`}
          helperText={errors.email && errors.email.message?.toString()}
        />email
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: "Password is not strong enough.",
            },
          })}
          error={!!errors.password}
          // helperText={errors?.password?.message}
          helperText={errors.password && errors.password.message?.toString()}
        />
        {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}

        {/* {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map((error) => (
                <ListItem key={error}>
                  <ListItemText>{error}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )} */}
        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
          <Grid item>
            <Link to="/login">{"Already have an account? Sign In"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
