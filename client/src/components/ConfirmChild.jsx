import { useState } from "react";
import axios from "axios";
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

function ConfirmChild() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  async function getAllChildData() {
    let response = await axios.get("/api/children");
    console.log("💀 ~ getAllChildData ~ response:", response);
  }

  function goToMain() {
    navigate("/main");
  }

  getAllChildData();
  return (
    <>
      <Box p="md" rounded="md" bg="primary">
        <Text>子どもの確認</Text>

        <Button onClick={goToMain}>🏠</Button>
      </Box>
    </>
  );
}

//以下に公開変数、関数を記載
export default ConfirmChild;
