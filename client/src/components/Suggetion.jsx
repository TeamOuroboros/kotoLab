import { useState } from "react";
import { Box } from "@yamada-ui/react";
import { Text } from "@yamada-ui/react";
import {
  Button,
  SimpleGrid,
  GridItem,
  For,
  Radio,
  RadioGroup,
  Switch,
} from "@yamada-ui/react";
import { useNavigate } from "react-router";
let sendAiMode = "おまかせ";

function Suggetion() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  function goToMain() {
    navigate("/main");
  }

  function getAIMode(e) {
    sendAiMode = e.target.value;
  }

  return (
    <>
      <Box p="md" rounded="md" bg="primary">
        <Text>提案について</Text>
        <Text>AIである以上ばらつきがある可能性があります</Text>
        <Box>
          <Text>
            おまかせ
            <input
              onClick={getAIMode}
              type="radio"
              name="setting"
              value="おまかせ"
            />
          </Text>
          <Text>過去の記録から満遍なく提案します</Text>
        </Box>
        <Box>
          <Text>
            アクティブ
            <input
              onClick={getAIMode}
              type="radio"
              name="setting"
              value="アクティブ"
            />
          </Text>
          <Text>なるべく外遊びを提案します</Text>
        </Box>
        <Box>
          <Text>
            おうち
            <input
              onClick={getAIMode}
              type="radio"
              name="setting"
              value="おうち"
            />
          </Text>
          <Text>家の中でできる過ごし方を中心に提案します</Text>
        </Box>
        <Box>
          <Text>
            屋内
            <input
              onClick={getAIMode}
              type="radio"
              name="setting"
              value="屋内"
            />
          </Text>
          <Text>屋内施設で過ごせる提案をします</Text>
        </Box>

        <Button onClick={goToMain}>🏠</Button>
      </Box>
    </>
  );
}

//以下に公開変数、関数を記載
export { Suggetion, sendAiMode };
