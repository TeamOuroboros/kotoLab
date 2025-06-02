import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
} from "@mui/material";

function ChildRegister() {
  const [childName, setChildName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const processingRegisterChild = async () => {
    try {
      await axios.post("/api/children", {
        name: childName,
        gender,
        birthday,
      });
      alert("子供の登録に成功しました。");
      navigate("/main");
    } catch (err) {
      alert("登録失敗");
      console.error(err);
    }
  };

  const genderChange = async (e, newGender) => {
    // console.log("🚀 ~ ChildRegister ~ gender:", e, newGender);

    if (newGender !== null) {
      setGender(newGender);
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
        height: "100%",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          processingRegisterChild();
        }}
      >
        <Typography variant="h4" align="center" mb={6}>
          子どもの登録
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="こどもの名前"
            placeholder="👦名前を入力"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            fullWidth
            sx={{ color: "text.secondary" }}
          />
          <TextField
            label="誕生日"
            placeholder="📅YYYY/MM/DD"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            fullWidth
            sx={{ color: "text.secondary" }}
          />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              性別を選択
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={gender}
              exclusive
              onChange={genderChange}
              fullWidth
            >
              <ToggleButton value="男の子">🚹　おとこのこ</ToggleButton>
              <ToggleButton value="女の子">🚺　おんなのこ</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box mt={4}>
            <Button type="submit">登録</Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

export default ChildRegister;
