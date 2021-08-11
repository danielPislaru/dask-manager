import { createTheme } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

const theme = createTheme({
  type: "default",
  breakpoints,
  palette: {
    primary: {
      light: "#99aeb3",
      main: "#335C67",
      dark: "#1f373e",
      contrastText: "#fefefe",
    },
    secondary: {
      light: "#eebb98",
      main: "#dd7631",
      dark: "#9b5322",
      contrastText: "#fefefe",
    },
    urgency: { low: "#00c853", medium: "#f57c00", high: "#d50000" },
    status: { backlog: "#2d4970", progress: "#01d0fa", done: "#00fb8a" },
    background: { light: "#fefefe" },
    text: { light: "#8890B5" },
    contrastThreshold: 10,
    tonalOffset: 0.8,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        color: "#335C67",
        html: {
          color: "#335C67",
          WebkitFontSmoothing: "auto",
        },
        body: {
          color: "#335C67",
          backgroundColor: "#F5F6FF",
        },
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: "#335C67",
        color: "#fefefe",
        [breakpoints.down("sm")]: {
          width: "auto",
        },
      },
      root: {
        color: "#fefefe",
        textTransform: "none",
        [breakpoints.down("sm")]: {
          fontSize: "0.6rem",
          padding: "10px 8px",
          minWidth: "50px",
        },
        [breakpoints.down("xs")]: {
          fontSize: "0.6rem",
          padding: "5px 5px",
          minWidth: "30px",
        },
      },
    },
    MuiIconButton: {
      root: {
        color: "#fefefe",
        [breakpoints.down("sm")]: {
          padding: "9px",
        },
        [breakpoints.down("xs")]: {
          padding: "6px",
        },
      },
    },
    MuiTypography: {
      h1: {
        [breakpoints.down("md")]: {
          fontSize: "4rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "3rem",
        },
        [breakpoints.down("xs")]: {
          fontSize: "2.5rem",
        },
      },
      h4: {
        [breakpoints.down("md")]: {
          fontSize: "1.9rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.6rem",
        },
        [breakpoints.down("xs")]: {
          fontSize: "1.4rem",
        },
      },
      h6: {
        [breakpoints.down("md")]: {
          fontSize: "1.2rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.1rem",
        },
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      subtitle1: {
        color: "#8890B5", //text light
        fontWeight: "600",
        [breakpoints.down("xs")]: {
          fontSize: "0.8rem",
        },
      },
      subtitle2: {
        [breakpoints.down("xs")]: {
          fontSize: "0.7rem",
        },
      },
    },
  },
  typography: {
    // Use the system font over Roboto.
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    htmlFontSize: 16,
    color: "#14256A",
  },
});

export default theme;
