import React, { useEffect, useState } from "react";
import { Box, Text, Button, Icon } from "@yamada-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Proposal() {
  const location = useLocation();
  const contactResult = location.state.resText || "データ取得に失敗しました";
  const [text, setText] = useState([]);
  const [markdown, setMarkdown] = useState(contactResult);

  // テキストの要約を表示する関数
  const summary = (markdownText) => {
    const regex = /##\s*要約\s*[\r\n]+(.+)/g;
    const result = [];
    let match;
    while ((match = regex.exec(markdownText))) {
      result.push(match[1].trim());
    }
    setText(result);
  };

  // テキストの詳細を表示する関数
  const detail = () => {
    const regex = /##\s*詳細\s*[\r\n]+([\s\S]*?)(?=(?:^#\s*提案|\s*$))/gm;
    const result = [];
    let match;

    while ((match = regex.exec(markdown))) {
      result.push(match[1].trim());
    }
    setText(result);
  };

  // 再提案のためもう一度 /api/contact を呼び出す
  const contactRequestProposal = async () => {
    try {
      const res = await axios.post(
        "/api/contact",
        {
          weather: "晴れ",
          maxTemperture: "40度",
          minTemperture: "25度",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          //session_token自動付与する
          withCredentials: true,
        }
      );
      const resTextProposal = res.data.contactResult;

      //markdownを上書き←詳細のデータを置き換える為
      setMarkdown(resTextProposal);
      //要約表示
      summary(resTextProposal);

      // goToProposal();
    } catch (error) {
      console.error("❌contactRequest", error);
    }
  };

  // main に遷移
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/main");
  };

  //要約表示時にマウント
  useEffect(() => {
    summary(contactResult);
    console.log("🚀 ~ useEffect ~ contactResult:", contactResult);
  }, []);

  return (
    <>
      <h1>Proposalページ</h1>

      <Box p={10}>
        <Box>
          {text.map((text, i) => (
            <Text key={i}>
              提案{i + 1} <br />
              {text}
            </Text>
          ))}
        </Box>
      </Box>

      <Button
        bg="#bcd4c1"
        w="180"
        h="80"
        _hover={{ bg: "#a7c8b1" }}
        rounded="full"
        onClick={detail}
      >
        詳細
      </Button>

      <Button
        bg="#bcd4c1"
        w="180"
        h="80"
        _hover={{ bg: "#a7c8b1" }}
        rounded="full"
        onClick={contactRequestProposal}
      >
        再提案
      </Button>

      <Button
        position="fixed"
        right="40px"
        bottom="30px"
        bg="#bcd4c1"
        px={5}
        py={4}
        borderRadius="full"
        boxShadow="md"
        _hover={{ bg: "#a7c8b1" }}
        onClick={goToMain}
        fontSize="30px"
      >
        🏠
      </Button>
    </>
  );
}

export default Proposal;
