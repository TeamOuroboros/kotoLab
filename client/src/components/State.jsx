import React from "react";
import { Box, Text, Button, Icon } from "@yamada-ui/react";
import { MdWbSunny, MdNightsStay, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";

function State() {
  const navigate = useNavigate();
  function goToMain() {
    navigate("/main");
  }
  function goToFeeling() {
    navigate("/main/feeling"); //⚡️⚡️パスは後で擦り合わせ
  }
  return (
    <>
      <h1>Stateページ</h1>
      <Button
        bg="#bcd4c1"
        w="180"
        h="80"
        _hover={{ bg: "#a7c8b1" }}
        rounded="full"
        onClick={goToFeeling}
      >
        ←
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

export default State;
