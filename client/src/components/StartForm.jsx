import { useNavigate } from "react-router";

import { Container, Image, Button } from "@yamada-ui/react";

function StartForm() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  return (
    <Container maxW="xs" mt="16">
      <Image
        src="https://dragon-ball-official.com/assets/img/intro/intro_1.png"
        boxSize="xs"
      />
      <Button
        type="submit"
        colorScheme="primary"
        onClick={() => navigate("/login")}
      >
        ログイン
      </Button>

      <Button
        type="submit"
        colorScheme="primary"
        onClick={() => navigate("/register")}
      >
        アカウント作成
      </Button>
    </Container>
  );
}

export default StartForm;
