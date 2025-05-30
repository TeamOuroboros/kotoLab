import React from "react";
import { Box, Text, Button, Icon } from "@yamada-ui/react";
import { MdWbSunny, MdNightsStay, MdSettings } from "react-icons/md";

function App() {
  return (
    // ボタンcss共通
    // 	<Button
    // 	bg="#bcd4c1"
    // 	minW={0}
    // 	p={2}
    // 	borderRadius="full"
    // 	boxShadow="none"
    // 	_hover={{ bg: "#a7c8b1" }}
    //   >
    <Box>
      {/* 日時温度 ======================================================後でこれからAPIのデータ元に作成しまーす*/}
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
      <Box alignItems="center" justifyContent="center" flexDirection="column">
        <Text fontSize="30px" my={10}>
          きょうをつくろう。
        </Text>

        {/* 提案ボタン　記録 */}
        <Box display="flex" flexDirection="column" gap={30} rounded="full">
          <Button
            bg="#bcd4c1"
            w="150"
            h="50"
            _hover={{ bg: "#a7c8b1" }}
            rounded="full"
          >
            提案
          </Button>
          <Button
            bg="#bcd4c1"
            w="150"
            h="50"
            _hover={{ bg: "#a7c8b1" }}
            rounded="full"
          >
            記録
          </Button>
        </Box>
      </Box>

      {/* 設定ボタン */}
      <Box alignSelf="flex-end" align="right">
        <Button bg="#bcd4c1" p={2} _hover={{ bg: "#a7c8b1" }} rounded="full">
          <Icon as={MdSettings} />
        </Button>
      </Box>
    </Box>
  );
}

export default App;
