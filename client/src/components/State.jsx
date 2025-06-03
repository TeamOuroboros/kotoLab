import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import { ArrowBack, ArrowForward, Home } from "@mui/icons-material";

function State() {
  const [textMap, setTextMap] = useState({});
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();

  const stateSubmit = async () => {
    try {
      const requests = children.map((child) => {
        const input = textMap[child.id]?.trim();
        const payload = {
          children_id: child.id,
          child_state: input || "特に何もなし",
          log_date: new Date(),
        };
        return axios.post("/api/log/childstate", payload);
      });

      await Promise.all(requests);
      alert("お子さんの状態わかりました。");
      navigate("/main");
    } catch (err) {
      alert("保存に失敗しました");
      console.error(err);
    }
  };

  const statusWrite = (id, value) => {
    setTextMap((prev) => ({ ...prev, [id]: value }));
  };

  const getChidlren = async () => {
    const res = await axios.get("/api/children");
    setChildren(res.data);
  };

  useEffect(() => {
    getChidlren();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        bgcolor: "background.default",
        flexDirection: "column", // 縦並び
        justifyContent: "center",
        // alignItems: "center",
        minHeight: "100vh",
        px: 1,
      }}
    >
      <Stack spacing={4} alignItems={"center"}>
        {children.length === 0 ? (
          <>
            <Typography variant="body1" textAlign={"center"} mb={8}>
              登録された子どもがいません
            </Typography>
            <Button
              sx={{ fontWeight: "bold", mt: 20 }}
              onClick={() => navigate("/register/children")}
            >
              子供を登録する
            </Button>
          </>
        ) : (
          children.map((child) => (
            <Box key={child.id} width={"100%"}>
              <Typography variant="h6">
                {child.name}ちゃんのようすは？
              </Typography>

              <TextField
                placeholder="様子を入力（省略可）"
                multiline
                minRows={6}
                fullWidth
                value={textMap[child.id] || ""}
                onChange={(e) => statusWrite(child.id, e.target.value)}
              />
            </Box>
          ))
        )}
        <IconButton onClick={stateSubmit}>
          <ArrowForward />
        </IconButton>
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
    </Container>
  );
}

export default State;
