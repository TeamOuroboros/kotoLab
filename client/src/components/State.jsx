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
    <Container>
      <Stack spacing={4} alignItems={"center"}>
        {children.map((child) => (
          <Box key={child.id} width={"100%"}>
            <Typography>{child.name}ちゃんのようすは？</Typography>

            <TextField
              placeholder="様子を入力（省略可）"
              multiline
              minRows={10}
              fullWidth
              value={textMap[child.id] || ""}
              onChange={(e) => statusWrite(child.id, e.target.value)}
            />
          </Box>
        ))}

        <IconButton onClick={stateSubmit}>
          <ArrowForward />
        </IconButton>
        <Stack direction={"row"} spacing={2}>
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
