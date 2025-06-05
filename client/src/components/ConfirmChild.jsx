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

function ConfirmChild() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。
  const [getdata, setgetdata] = useState([]);
  const [childState, setChildState] = useState([]);

  useEffect(() => {
    async function getAllChildData() {
      const response = await axios.get("/api/children");
      const ids = response.data.map((child) => child.id).join(",");
      const resopnse_log = await axios.get(`api/log/childstate?ids=${ids}`);
      setgetdata(response.data);
      setChildState(resopnse_log.data.data);
    }
    getAllChildData();
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
        子どもの確認
      </Typography>
      <Stack spacing={2} width={"100%"}>
        {getdata.length === 0 ? (
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
          getdata.map((info) => {
            const state = childState.find((log) => log.children_id === info.id);

            return (
              <Card
                key={info.id}
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
                    <Typography fontSize={"1.1rem"}>👶 {info.name}</Typography>
                    <Typography fontSize={"1.1rem"}>
                      🗓️ {info.birthday.slice(0, 10)}
                    </Typography>
                    <Typography fontSize={"1.1rem"}>
                      😃 状態:{" "}
                      {state?.child_state
                        ? state.child_state
                        : "記録がありません"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}
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
export default ConfirmChild;
