import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import axios from "axios";
import { Home, ArrowBack } from "@mui/icons-material";

function Proposal() {
  const location = useLocation();

  const contactResult = location.state.resText || "データ取得に失敗しました";
  const [text, setText] = useState([]);
  const [markdown, setMarkdown] = useState(contactResult);
  const [isDetailShown, setIsDetailShown] = useState(false);

  // テキストの要約を表示する関数
  const summary = (markdownText) => {
    const regex = /##\s*要約\s*[\r\n]+(.+)/gm;
    const result = [];
    let match;
    while ((match = regex.exec(markdownText))) {
      result.push(match[1].trim());
    }
    setText(result);
  };

  // テキストの詳細を表示する関数
  const detail = () => {
    const regex = /##\s*詳細\s*[\r\n]+([\s\S]*?)(?=(?:^#\s*提案|\s*$))/gm;
    const result = [];
    let match;

    while ((match = regex.exec(markdown))) {
      result.push(match[1].trim());
    }
    setText(result);
  };

  const toggleDetail = () => {
    if (isDetailShown) {
      summary(markdown);
    } else {
      detail();
    }
    setIsDetailShown((prev) => !prev);
  };

  // 再提案のためもう一度 /api/contact を呼び出す
  const contactRequestProposal = async () => {
    try {
      const res = await axios.post(
        "/api/contact",
        {
          weather: "晴れ",
          maxTemperture: "40度",
          minTemperture: "25度",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          //session_token自動付与する
          withCredentials: true,
        }
      );
      const resTextProposal = res.data.contactResult;

      //markdownを上書き←詳細のデータを置き換える為
      setMarkdown(resTextProposal);
      //要約表示
      summary(resTextProposal);

      setIsDetailShown(false);

      // goToProposal();
    } catch (error) {
      console.error("❌contactRequest", error);
    }
  };

  // main に遷移
  const navigate = useNavigate();

  //要約表示時にマウント
  useEffect(() => {
    summary(contactResult);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowY: "auto",
        p: 3,
        pb: 10,
        maxWidth: "xs",
        mx: "auto",
      }}
    >
      {/* タイトル */}
      <Typography variant="h5" fontWeight={"bold"} textAlign={"center"}>
        おすすすめのすごしかた
      </Typography>
      <Typography variant="body2" textAlign={"center"} mb={3}>
        これまでの記録より、AIによる提案です。
      </Typography>

      {/* 提案結果 */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 4,
          width: "100%",
          borderRadius: 3,
          overflowY: "auto",
          bgcolor: "background.default",
          maxHeight: 500,
        }}
      >
        <Stack spacing={1}>
          {text.map((text, i) => (
            <Box key={i}>
              <Typography variant="subtitle1">提案{i + 1}</Typography>
              <Typography variant="body1">{text}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* ボタン */}
      <Stack spacing={2} width={"100%"}>
        <Button
          variant="contained"
          sx={{ height: 50, fontWeight: "bold", bgcolor: "#bcd4c1" }}
          onClick={toggleDetail}
        >
          {isDetailShown ? "要約に戻す" : "詳細"}
        </Button>

        <Button
          variant="contained"
          sx={{ height: 50, fontWeight: "bold", bgcolor: "#bcd4c1" }}
          onClick={contactRequestProposal}
        >
          再提案
        </Button>
      </Stack>

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
    </Box>
  );
}

export default Proposal;
