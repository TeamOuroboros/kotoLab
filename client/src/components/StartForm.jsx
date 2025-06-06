import { useNavigate } from "react-router";
import { Box, Button } from "@mui/material";
import logo from "../assets/logo.png";

function StartForm() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // 縦並び
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        px: 2,
        textAlign: "center",
      }}
    >
      <Box
        component={"img"}
        src={logo}
        alt="ウパ"
        style={{
          width: "100%", // size調整
          // maxWidth: "300px",
          height: "auto",
          mb: 4,
        }}
      ></Box>

      <Button onClick={handleLogin}>ログイン</Button>

      <Button onClick={handleRegister}>アカウント作成</Button>
    </Box>
  );
}

export default StartForm;
