import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Container,
  Box,
  Typography,
  Stack,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { ArrowBack, Home } from "@mui/icons-material";

let parentfeeling = "";

function ConfirmParent() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。
  const [getdata, setgetdata] = useState([]);

  useEffect(() => {
    async function getParentState() {
      const response = await axios.get("/api/log/parent");
      parentfeeling = response.data.data[0].parent_feeling;

      parentfeeling = parentfeeling.replace("{", "");
      parentfeeling = parentfeeling.replace("}", "");
      parentfeeling = parentfeeling.replace(/"/g, "");

      setgetdata(response.data.data);
    }

    getParentState();
  }, []);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        bgcolor: "background.default",
        flexDirection: "column", // 縦並び
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 4,
      }}
    >
      <Typography variant="h4" fontWeight={"bold"} textAlign={"center"} mb={8}>
        親の確認
      </Typography>
      <Stack spacing={2} width={"100%"}>
        {
          <Card
            variant="outlined"
            sx={{ bgcolor: "#EDEDED", borderRadius: 3, boxShadow: "none" }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 240 }}>
                <Typography fontSize={"1.1rem"}>
                  👤 {getdata[0]?.name}
                </Typography>
                <Typography fontSize={"1.1rem"}>
                  😃 状態:{parentfeeling}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        }
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

//以下に公開変数、関数を記載
export default ConfirmParent;
