import React from "react";
import { Box, Text, Button, Icon } from "@yamada-ui/react";
import { MdWbSunny, MdNightsStay, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router";

function Feeling() {
  const navigate = useNavigate();

  function goToProposal() {
    navigate("/main/state");
  }
  function goToMain() {
    navigate("/main");
  }

  return (
    <>
      <h1>fellingページ</h1>
      <Button
        bg="#bcd4c1"
        w="180"
        h="80"
        _hover={{ bg: "#a7c8b1" }}
        rounded="full"
        onClick={goToProposal}
      >
        →
      </Button>
      <Button
        bg="#bcd4c1"
        w="180"
        h="80"
        _hover={{ bg: "#a7c8b1" }}
        rounded="full"
        onClick={goToMain}
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

export default Feeling;
