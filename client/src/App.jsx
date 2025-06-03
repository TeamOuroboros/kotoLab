import React, { useEffect, useState } from "react";
import { Box, Text, Button, Icon } from "@yamada-ui/react";
import { MdWbSunny, MdNightsStay, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router";
import axios from "axios";
import { sendAiMode } from "./components/Suggetion";

function App() {
  console.log("💀 ~ sendAiMode:", sendAiMode);
  const [weather, setWeather] = useState("Clear");
  const [maxTemperature, setMaxTemperature] = useState("");
  const [minTemperature, setMinTemperature] = useState("");
  const [icon, setIcon] = useState("");
  const [todayFist, setFistData] = useState({});
  const [todayLast, setLastData] = useState({});
  const [formatted, setformatted] = useState("");
  const navigate = useNavigate();

  // function goToProposal() {
  //   navigate("/main/proposal");
  // }

  function goToFeeling() {
    navigate("/main/feeling");
  }
  function goToSettings() {
    navigate("/setting");
  }
  //天気情報を取得する関数
  const handleSubmit = async () => {
    const { latitude, longitude } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error)
      );
    });
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
    // console.log(
    //   "🚀 ~ handleSubmit ~ weather, maxTemperature, minTemperature:",
    //   weather,
    //   maxTemperature,
    //   minTemperature,
    //   icon,
    //   todayFist,
    //   todayLast,
    //   formatted
    // );
    setWeather(weather);
    setMaxTemperature(maxTemperature);
    setMinTemperature(minTemperature);
    setIcon(icon);
    setFistData(todayFist);
    setLastData(todayLast);
    setformatted(formatted);
  };

  const contactRequest = async () => {
    console.log("hello2");
    console.log("💀 ~ sendAiMode:", sendAiMode);

    try {
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
      const resText = res.data.contactResult;

      // 成功したら画面遷移　　goToProposalらは一旦コメントアウト
      navigate("/main/proposal", {
        state: { resText: resText },
      });
      // goToProposal();
    } catch (error) {
      console.error("❌contactRequest", error.response || error);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <Box>
      <Box textAlign="center" display="flex">
        <Text fontWeight="bold" fontSize="20px" verticalAlign="middle">
          {formatted} {icon}
        </Text>
        <Text ml="auto" verticalAlign="middle" fontSize="15px">
          {todayFist.todayFirstIcon}
          {todayFist.todayFirstTemp} / {todayLast.todayLastIcon}
          {todayLast.todayLastTemp}
        </Text>
      </Box>

      {/* きょうをつくろう。 のテキスト*/}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        // justifyContent="center"
        h="450px"
      >
        <Text fontSize="40px" my={10} pb={150}>
          きょうをつくろう。
        </Text>

        {/* 提案ボタン　記録 */}
        <Box display="flex" flexDirection="column" gap={30} rounded="full">
          <Button
            bg="#bcd4c1"
            w="180"
            h="80"
            _hover={{ bg: "#a7c8b1" }}
            rounded="full"
            onClick={contactRequest}
          >
            提案
          </Button>
          <Button
            bg="#bcd4c1"
            w="180"
            h="80"
            _hover={{ bg: "#a7c8b1" }}
            rounded="full"
            onClick={goToFeeling}
          >
            記録
          </Button>
        </Box>
      </Box>

      {/* 設定ボタン */}

      <Box alignSelf="flex-end" align="right">
        <Button
          bg="#bcd4c1"
          p={15}
          _hover={{ bg: "#a7c8b1" }}
          rounded="full"
          onClick={goToSettings}
        >
          <Icon as={MdSettings} />
        </Button>
      </Box>
    </Box>
  );
}

export default App;
