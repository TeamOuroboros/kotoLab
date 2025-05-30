import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Container,
  VStack,
  Heading,
  FormControl,
  Input,
  Button,
  PasswordInput,
} from "@yamada-ui/react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const processingLogin = async () => {
    try {
      await axios.post("/api/auth/login", { username, password });
      navigate("/register/children"); //
    } catch (err) {
      alert("ログイン失敗");
      console.error(err);
    }
  };

  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const googleLogin = () => {
    window.location.href = `${backUrl}/api/auth/google`;
  };

  return (
    <Container maxW="xs" mt="16">
      <VStack
        spacing="6"
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          processingLogin();
        }}
      >
        <Heading as="h1" size="lg" textAlign={"center"}>
          ログイン
        </Heading>

        <FormControl label="メールアドレス">
          <Input
            type="email"
            placeholder="メールアドレスを入力"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl label="パスワード">
          <PasswordInput
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="primary" width="full">
          ログイン
        </Button>

        <Button type="submit" colorScheme="primary" onClick={googleLogin}>
          Googleでログイン
        </Button>
      </VStack>
    </Container>
  );
}

export default LoginForm;
