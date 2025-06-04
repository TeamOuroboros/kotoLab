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
import { ArrowBack } from "@mui/icons-material";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const processingLogin = async () => {
    try {
      await axios.post("/api/auth/login", {
        mail: email,
        password,
      });

      const res = await axios.get("/api/children");

      if (res.data.length > 0) {
        navigate("/main"); //子供の登録があればメイン画面遷移
      } else {
        navigate("/register/children"); //子供の登録なければ子供登録
      }
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
    // window.location.href = `${backUrl}/api/auth/google`;
    window.location.href = `/api/auth/google`;
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column", // 縦並び
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          processingLogin();
        }}
        sx={{ width: "100%", maxWidth: 360 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          ログイン
        </Typography>

        <Stack spacing={3}>
          {/* メールアドレス */}
          {/* ラベル + 入力欄をグループ化するためのコンテナ */}
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="email" sx={{ color: "text.secondary" }}>
              ✉️メールアドレスを入力
            </InputLabel>
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
            <InputLabel htmlFor="password" sx={{ color: "text.secondary" }}>
              パスワードを入力
            </InputLabel>
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

          <Box mt={8}>
            <Button type="submit">ログイン</Button>
          </Box>
        </Stack>
      </Box>
      <Button onClick={googleLogin}>Googleでログイン</Button>
      {/* 左下 */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: "#B1CDC4",
          color: "#544739",
          width: 48,
          height: 48,
          borderRadius: "50%",
          "&:hover": {
            bgcolor: "#A0BEB5",
          },
        }}
      >
        <ArrowBack />
      </IconButton>
    </Container>
  );
}

export default LoginForm;
