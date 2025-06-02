import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B1CDC4",
    },
    background: {
      default: "#FFFCF7",
    },
    text: {
      primary: "#544739",
    },
  },
  typography: {
    fontFamily: "'Noto Sans JP', sans-serif",
    allVariants: {
      color: "#544739", //タイトルや本文、キャプションなど、すべてのTypographyバリエーションに共通して適用
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined",
        color: "primary",
        size: "small",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          marginTop: "20px",
          paddingTop: "6px",
          paddingBottom: "6px",
          borderRadius: "20px",
          color: "#544739",
          borderColor: "#B1CDC4",
          "&:hover": {
            backgroundColor: "#B1CDC4",
            borderColor: "#A0BEB5",
          },
        },
      },
    },
  },
});

export default theme;
