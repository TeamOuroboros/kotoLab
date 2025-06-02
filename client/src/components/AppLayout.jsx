import { Box } from "@mui/material";

function AppLayout({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "390px",
        height: "100vh",
        mx: "auto", // 左右中央寄せ
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        bgcolor: "background.default",
        color: "text.primary",
        overflow: "auto",

        border: "1px solid #ccc",

        // 可変で反映
        "@media (min-width: 391px)": {
          borderRadius: "12px",
        },
      }}
    >
      {children}
    </Box>
  );
}

export default AppLayout;
