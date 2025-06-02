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
  const [text, setText] = useState("");
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();

  const stateSubmit = async () => {
    try {
      await axios.post("/api/log/childstate", {
        children_id: children[0].id,
        child_state: text,
        log_date: new Date(),
      });
      alert("お子さんの状態わかりました。");
      navigate("/main");
    } catch (err) {
      alert("保存に失敗しました");
      console.error(err);
    }
  };

  const getChidlren = async () => {
    const res = await axios.get("/api/children");
    setChildren(res.data);
  };

  useEffect(() => {
    getChidlren();
  }, []);

  return (
    <Container>
      <Stack spacing={4} alignItems={"center"}>
        <Typography>{}ちゃんのようすは？</Typography>

        <TextField
          placeholder="様子を入力（省略可）"
          multiline
          minRows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton onClick={stateSubmit}>
          <ArrowForward />
        </IconButton>
        <Stack direction={"row"}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={() => navigate("/main")}>
            <Home />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
}

export default State;
