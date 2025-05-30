import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Container,
  VStack,
  Heading,
  FormControl,
  Select,
  Input,
  Button,
  PasswordInput,
  OptionGroup,
  Option,
} from "@yamada-ui/react";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const getLocation = async (region) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${adress}`;
    try {
      const res = axios.get(url);
      if (res.data && res.data.length > 0) {
        const { lat, lon } = (await res).data[0];
        return { lat, lon };
      } else {
        throw new Error("住所から緯度経度が見つかりませんでした");
      }
    } catch (err) {
      console.error("位置の取得に失敗", err);
      throw err;
    }
  };

  const processingRegister = async () => {
    try {
      const { lat, lon } = await getLocation(region);

      await axios.post("/api/auth/register", {
        username,
        email,
        password,
        adress: region,
        lat,
        lon,
      });
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
        <Heading as="h2" size="lg" textAlign={"center"}>
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

        <FormControl label="居住地を選択">
          <Select
            placeholder="居住地を選択"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholderInOptions={false}
          >
            <OptionGroup label="東京">
              <Option value="新宿区">新宿区</Option>
              <Option value="港区">港区</Option>
              <Option value="台東区">台東区</Option>
            </OptionGroup>
            <OptionGroup label="愛知県">
              <Option value="名古屋市">名古屋市</Option>
              <Option value="豊田市">豊田市</Option>
              <Option value="安城市">安城市</Option>
              <Option value="岡崎市">岡崎市</Option>
              <Option value="豊橋市">豊橋市</Option>
              <Option value="半田市">半田市</Option>
            </OptionGroup>
          </Select>
        </FormControl>

        <Button type="submit" fullWidth color="primary">
          アカウント作成
        </Button>
      </VStack>
    </Container>
  );
}

export default RegisterForm;
