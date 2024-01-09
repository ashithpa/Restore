import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

export default function Notfound() {
  const { state } = useLocation();

  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Oops - We could not find waht you are looking for
      </Typography>
      <Divider></Divider>
      <Button fullWidth component={Link} to="/catalog">
        Go back to shop
      </Button>
    </Container>
  );
}
