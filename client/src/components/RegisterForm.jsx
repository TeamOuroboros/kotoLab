import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  OutlinedInput,
} from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const getLocation = async (region) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${region}`;
    try {
      const res = await axios.get(url);

      if (res.data && res.data.length > 0) {
        const { lat, lon } = res.data[0];
        return { lat, lon };
      } else {
        throw new Error("住所から緯度経度が見つかりませんでした");
      }
    } catch (err) {
      console.error("位置の取得に失敗", err);
      throw err;
    }
  };

  const processingRegister = async () => {
    try {
      const { lat, lon } = await getLocation(region);
      await axios.post("/api/auth/register", {
        name: username,
        mail: email,
        password,
        address: region,
        lat,
        lon,
      });
      alert("登録に成功しました。");

      //登録後、ログイン
      await axios.post("/api/auth/login", {
        mail: email,
        password,
      });

      //子供登録へ
      navigate("/register/children");
    } catch (err) {
      alert("登録失敗");
      console.error(err);
    }
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
          processingRegister();
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          アカウント作成
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="ニックネーム"
            placeholder="ニックネームを入力"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          ></TextField>

          <TextField
            label="メールアドレス"
            type="email"
            placeholder="メールアドレスを入力"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          ></TextField>

          <TextField
            label="パスワード"
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          ></TextField>

          <FormControl fullWidth>
            <InputLabel id="region-label">居住地</InputLabel>
            <Select
              labelId="region-label"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              label="居住地"
              input={<OutlinedInput label="居住地" />}
            >
              <ListSubheader>東京都</ListSubheader>
              <MenuItem value="新宿">新宿区</MenuItem>
              <ListSubheader>愛知県</ListSubheader>
              <MenuItem value="豊田市">豊田市</MenuItem>
              <MenuItem value="岡崎市">岡崎市</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            アカウント作成
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default RegisterForm;
