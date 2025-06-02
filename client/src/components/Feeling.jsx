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
} from "@mui/material";

import { ArrowBack, ArrowForward, Home } from "@mui/icons-material";

const feelings = [
  "満足",
  "感謝",
  "嬉しい",
  "ワクワク",
  "好き",
  "感心",
  "面白い",
  "楽しい",
  "スッキリ",
  "ドキドキ",
  "安心",
  "穏やか",
  "普通",
  "憂鬱",
  "モヤモヤ",
  "緊張",
  "不安",
  "悲しい",
  "疲れた",
  "後悔",
  "恐れる",
  "イライラ",
  "怒り",
  "嫌い",
];

function Feeling() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。
  //   console.log("🚀 ~ FeelingOfParents ~ selected:", selected);

  const setFeeling = (feeling) => {
    setSelected((prev) =>
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling]
    );
  };

  const submitFeeling = async () => {
    // console.log(selected);
    try {
      await axios.post("/api/log/parent", {
        parent_feeling: selected,
        log_date: new Date(),
      });
      alert("あなたの今の気持ちわかりました。");
      navigate("/main/state");
    } catch (err) {
      if (err.response.status === 409) {
        alert("すでに今日のあなたの気持ちは登録ずみです");
        navigate("/main/state");
      }
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={3}>
        <Box sx={{ gap: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            どんな気持ち？
          </Typography>
          {feelings.map((feeling) => (
            <Button
              key={feeling}
              variant={selected.includes(feeling) ? "contained" : "outlined"}
              onClick={() => setFeeling(feeling)}
              sx={{
                borderRadius: "50%",
                width: 80,
                height: 80,
                fontSize: "0.7rem",
                padding: "1rem",
              }}
            >
              {feeling}
            </Button>
          ))}

          <IconButton onClick={submitFeeling}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Stack>
      <Stack direction={"row"}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={() => navigate("/main")}>
          <Home />
        </IconButton>
      </Stack>
    </Container>
  );
}

export default Feeling;
