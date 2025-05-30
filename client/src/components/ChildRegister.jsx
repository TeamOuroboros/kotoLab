import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Container,
  VStack,
  Heading,
  FormControl,
  Label,
  Input,
  Button,
  PasswordInput,
} from "@yamada-ui/react";

function ChildRegister() {
  const [childNmae, setChildNmae] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const processingRegisterChild = async () => {
    try {
      await axios.post("/api/auth/login", { username, password });
      navigate("/records"); //
    } catch (err) {
      alert("ログイン失敗");
      console.error(err);
    }
  };

  return (
    <Container maxW="xs" mt="16">
      <VStack
        spacing="6"
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          processingRegisterChild();
        }}
      >
        <Heading as="h1" size="lg" textAlign={"center"}>
          ログイン
        </Heading>

        <FormControl label="子供の名前">
          <Input
            placeholder="名前を入力"
            value={email}
            onChange={(e) => setChildNmae(e.target.value)}
          />
        </FormControl>

        <FormControl label="誕生日">
          <Input
            placeholder="YYYY/MM/DD"
            value={password}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </FormControl>

        <FormControl label="性別">
          <Input
            placeholder="YYYY/MM/DD"
            value={password}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="primary" width="full">
          登録
        </Button>
      </VStack>
    </Container>
  );
}

export default ChildRegister;
