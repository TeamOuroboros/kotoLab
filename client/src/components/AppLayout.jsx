import { Box } from "@mui/material";

function AppLayout({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "390px",
        height: "844px",
        mx: "auto", // 左右中央寄せ
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        bgcolor: "background.default",
        color: "text.primary",
        overflow: "hidden",
        overflowX: "hidden",
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",

        // // 可変で反映
        // "@media (min-width: 391px)": {
        //   borderRadius: "12px",
        // },
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
    </Box>
  );
}

export default AppLayout;
