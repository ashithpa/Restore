import { AppBar, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";

interface Props {
  ChangeTheme: () => void;
  darkMode: boolean;
}

export default function Header({ ChangeTheme, darkMode }: Props) {
  // const {}
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">React JS</Typography>
        <Switch onChange={ChangeTheme} checked={darkMode} />
      </Toolbar>
    </AppBar>
  );
}
