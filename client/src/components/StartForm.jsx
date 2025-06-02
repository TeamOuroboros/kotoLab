import { useNavigate } from "react-router";
import { Box, Button } from "@mui/material";

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
        height: "100vh",
        px: 2,
      }}
    >
      <img
        src="https://dragon-ball-official.com/assets/img/intro/intro_1.png"
        alt="ドラゴンボール"
        style={{
          width: "300px", // size調整
          height: "auto",
          marginBottom: "32px",
        }}
      />
      <Button onClick={handleLogin}>ログイン</Button>

      <Button onClick={handleRegister}>アカウント作成</Button>
    </Box>
  );
}

export default StartForm;
