import React from "react";
import { Box, Text, Button, Icon } from "@yamada-ui/react";
import { MdWbSunny, MdNightsStay, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router";
import { MdHome } from "react-icons/md";

function Proposal() {
  const navigate = useNavigate();
  function goToMain() {
    navigate("/main");
  }
  return (
    <>
      <h1>Proposalページ</h1>
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
