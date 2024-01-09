import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  message?: string;
}

export default function LoadingComponent({message = 'Loading...'}: Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display="flex"
        justifyContent="center"
        justifyItems="center"
        height="20vh"
      >
        <CircularProgress size={100} color="secondary"></CircularProgress>
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", justifyItems:"center", top: "60%" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  )
}
