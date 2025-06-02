import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const processingLogin = async () => {
    try {
      await axios.post("/api/auth/login", { mail: email, password });
      navigate("/register/children"); //
    } catch (err) {
      alert("ログイン失敗");
      console.error(err);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const googleLogin = () => {
    window.location.href = `${backUrl}/api/auth/google`;
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column", // 縦並び
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          processingLogin();
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          ログイン
        </Typography>

        <Stack spacing={3}>
          {/* メールアドレス */}
          {/* ラベル + 入力欄をグループ化するためのコンテナ */}
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="email">メールアドレス</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              label="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          {/* パスワード */}
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">パスワード</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="パスワード"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label="パスワードの表示切替"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button type="submit">ログイン</Button>
        </Stack>
      </Box>
      <Button onClick={googleLogin}>Googleでログイン</Button>
    </Container>
  );
}

export default LoginForm;
