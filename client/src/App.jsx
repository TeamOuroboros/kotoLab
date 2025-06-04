import React, { useEffect, useState } from "react";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router";
import axios from "axios";
import { sendAiMode } from "./components/Suggetion";

import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";

function App() {
  const [weather, setWeather] = useState("Clear");
  const [maxTemperature, setMaxTemperature] = useState("");
  const [minTemperature, setMinTemperature] = useState("");
  const [icon, setIcon] = useState("");
  const [todayFist, setFistData] = useState({});
  const [todayLast, setLastData] = useState({});
  const [formatted, setformatted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function goToFeeling() {
    navigate("/main/feeling");
  }
  function goToSettings() {
    navigate("/setting");
  }
  //天気情報を取得する関数
  const handleSubmit = async () => {
    const res = await axios.get("api/auth/me");
    const user_id = res.data.user.id;
    const res2 = await axios.get(`api/user/${user_id}`);
    const userInfo = res2.data;
    const latitude = userInfo[0].lat;
    const longitude = userInfo[0].lon;

    const resWeather = await axios.get("/api/weather", {
      params: { latitude, longitude },
    });
    // console.log("🙆‍♀️☀️バックエンドからの天気レスポンス:", resWeather.data);
    const {
      weather,
      maxTemperature,
      minTemperature,
      icon,
      todayFist,
      todayLast,
      formatted,
    } = resWeather.data;

    setWeather(weather);
    setMaxTemperature(maxTemperature);
    setMinTemperature(minTemperature);
    setIcon(icon);
    setFistData(todayFist);
    setLastData(todayLast);
    setformatted(formatted);
  };

  const contactRequest = async () => {
    try {
      setIsLoading(true); //開始時にローディング
      const res = await axios.post(
        "/api/contact",
        {
          weather,
          maxTemperature,
          minTemperature,
          sendAiMode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          //session_token自動付与する
          withCredentials: true,
        }
      );
      console.log("💀 ~ contactRequest ~ weather:", weather);
      console.log("💀 ~ contactRequest ~ weather:", weather);
      const resText = res.data.contactResult;

      // 成功したら画面遷移　　goToProposalらは一旦コメントアウト
      navigate("/main/proposal", {
        state: { resText: resText },
      });
      // goToProposal();
    } catch (error) {
      console.error("❌contactRequest", error.response || error);
    } finally {
      setIsLoading(false); //完了時にローディングOFF
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <Box p={2}>
      {/* 上部　天気情報 */}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h6">
          {formatted} {icon}
        </Typography>

        <Typography variant="body1">
          {todayFist.todayFirstIcon}
          {todayFist.todayFirstTemp} / {todayLast.todayLastIcon}
          {todayLast.todayLastTemp}
        </Typography>
      </Box>

      {/* きょうをつくろう。 のテキスト*/}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="450px"
      >
        <Typography variant="h4" sx={{ my: 8, pb: 6 }}>
          きょうをつくろう。
        </Typography>

        {/* 提案ボタン　記録 */}
        <Stack spacing={5}>
          <Button
            onClick={contactRequest}
            sx={{
              width: 180,
              height: 60,
              borderRadius: 50,
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "提案"
            )}
          </Button>
          <Button
            onClick={goToFeeling}
            sx={{
              width: 180,
              height: 60,
              borderRadius: 50,
            }}
          >
            記録
          </Button>
        </Stack>
      </Box>

      {/* 設定ボタン */}

      <Box display={"flex"} justifyContent={"flex-end"} mt={8}>
        <IconButton
          onClick={goToSettings}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            color: "#544739",
            width: 48,
            height: 48,
            borderRadius: "50%",
            "&:hover": {
              bgcolor: "#A0BEB5",
            },
          }}
        >
          <MdSettings />
        </IconButton>
      </Box>
    </Box>
  );
}

export default App;
