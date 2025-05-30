import React from "react";
import { Box, Text, Button, Icon } from "@yamada-ui/react";
import { MdWbSunny, MdNightsStay, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router";
import axios from "axios";

function App() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  function goToProposal() {
    navigate("/main/proposal"); //⚡️⚡️パスは後で擦り合わせ
  }

  function goToFeeling() {
    navigate("/main/feeling"); //⚡️⚡️パスは後で擦り合わせ
  }
  function goToSettings() {
    navigate("/setting");
  }

  const contactRequest = async () => {
    console.log("🚀 ~ contactRequest呼ばれたよ");

    const res = await axios
      .post("/api/contact")
      .Set("Cookie", `session_token=12345`)
      .send({
        weather: "晴れ",
        maxTemperture: "40度",
        minTemperture: "25度",
      });

    goToProposal();
    console.log("🚀 ~ contactRequest ~ res.body:", res.body);
    console.log("🚀 ~ contactRequest ~ res.statusCode:", res.statusCode);
  };
  //   const handleClick = async () => {
  //     await contactRequest();
  //     goToProposal();
  //   };

  return (
    <Box>
      {/* 日時温度 ======================================================⚡️⚡️後でこれからAPIのデータ元に作成しまーす*/}
      <Box textAlign="center" display="flex">
        <Text fontWeight="bold" fontSize="20px" verticalAlign="middle">
          5/10 ☀️
        </Text>
        <Text ml="auto">
          <Icon as={MdWbSunny} verticalAlign="middle" fontSize="15px" /> 25°C /
          {"  "}
          <Icon as={MdNightsStay} verticalAlign="middle" fontSize="15px" /> 12°C
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
