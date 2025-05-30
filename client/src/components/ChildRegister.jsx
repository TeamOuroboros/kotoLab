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
    if (newGender !== null) {
      setGender(newGender);
    }
  };

  return (
    <Container max="xs" mt="16">
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          processingRegisterChild();
        }}
      >
        <Typography variant="h4" textAlign={"center"}>
          子供を登録
        </Typography>

        <TextField
          label="子供の名前"
          placeholder="名前を入力"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          fullWidth
        ></TextField>
        <TextField
          label="誕生日"
          placeholder="YYYY/MM/DD"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          fullWidth
        ></TextField>

        <Box>
          <Typography variant="h4" textAlign={"center"}>
            性別を選択
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={gender}
            exclusive
            onChange={genderChange}
            fullWidth
          >
            <ToggleButton value="男の子">男の子</ToggleButton>
            <ToggleButton value="女の子">女の子</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Button type="submit" fullWidth variant="contained">
          登録
        </Button>
      </Box>
    </Container>
  );
}

export default ChildRegister;
