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
  Card,
  CardContent,
} from "@mui/material";
import { ArrowBack, ArrowForward, Home } from "@mui/icons-material";

function ConfirmChild() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。
  const [getdata, setgetdata] = useState([]);

  function goToMain() {
    navigate("/main");
  }

  useEffect(() => {
    async function getAllChildData() {
      const response = await axios.get("/api/children");
      setgetdata(response.data);
    }

    getAllChildData();
  }, []);

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
      <Stack spacing={3} width={"100%"}>
        <Typography variant="h5" textAlign={"center"}>
          子どもの確認
        </Typography>
      </Stack>

      <Stack spacing={2} width={"100%"}>
        {getdata.map((info) => (
          <Card
            key={info.id}
            variant="outlined"
            sx={{ bgcolor: "#f6f6f6", borderRadius: 2 }}
          >
            <CardContent>
              <Typography>👶{info.name}</Typography>
              <Typography>🗓️{info.birthday.slice(0, 10)}</Typography>
            </CardContent>
          </Card>
        ))}

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

//以下に公開変数、関数を記載
export default ConfirmChild;
