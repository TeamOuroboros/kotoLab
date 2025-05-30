import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

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

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const processingRegister = async () => {
    try {
      await axios.post("/api/auth/register", { username, email, password });
      alert("登録に成功しました。ログインしてください。");
      navigate("/login");
    } catch (err) {
      alert("登録失敗");
      console.err(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <VStack
        spacing="6"
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          processingRegister();
        }}
      >
        <Heading as="h1" size="lg" textAlign={"center"}>
          アカウント作成
        </Heading>

        <FormControl label="ニックネーム">
          <Input
            placeholder="ニックネームを入力"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

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

        <FormControl label="居住地">
          <Input
            placeholder="居住地を選択"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </FormControl>

        <Button type="submit" fullWidth color="primary">
          アカウント作成
        </Button>
      </VStack>
    </Container>
  );
}

export default RegisterForm;
