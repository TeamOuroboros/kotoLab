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
  Grid,
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

  const setFeeling = (feeling) => {
    setSelected((prev) =>
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling]
    );
  };

  const submitFeeling = async () => {
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        py: 4,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        どんな気持ち？
      </Typography>
      <Grid container spacing={1} justifyContent={"center"}>
        {feelings.map((feeling) => (
          <Grid item key={feeling} display={"flex"} justifyContent={"center"}>
            <Button
              variant={selected.includes(feeling) ? "contained" : "outlined"}
              onClick={() => setFeeling(feeling)}
              sx={{
                borderRadius: "50%",
                width: 70,
                height: 70,
                fontSize: "0.7rem",
                padding: "0.5rem",
              }}
            >
              {feeling}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box mt={3}>
        <IconButton
          onClick={submitFeeling}
          sx={{
            bgcolor: "#B1CDC4",
            color: "#544739",
            width: 50,
            height: 50,
            borderRadius: "50%",
            "&:hover": {
              bgcolor: "#A0BEB5",
            },
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
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
          borderRadius: "70%",
          "&:hover": {
            bgcolor: "#A0BEB5",
          },
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* 右下 */}
      <IconButton
        onClick={() => navigate("/main")}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
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
        <Home />
      </IconButton>
    </Container>
  );
}

export default Feeling;
