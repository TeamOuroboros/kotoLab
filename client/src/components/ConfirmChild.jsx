import { useEffect, useState } from "react";
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
  const [getdata, setgetdata] = useState([]);

  function goToMain() {
    navigate("/main");
  }

  useEffect(() => {
    async function getAllChildData() {
      const response = await axios.get("/api/children");

      setgetdata(response.data);
    }

    getAllChildData();
  }, []);

  return (
    <>
      <Box p="md" rounded="md" bg="primary">
        <Text>子どもの確認</Text>
        {getdata.map((info) => (
          <Box p="md" rounded="md" bg="primary" key={info.id}>
            <Text>
              {info.name}
              <br />
              {info.birthday.slice(0, 10)}
              <br />
            </Text>
          </Box>
        ))}

        <Button onClick={goToMain}>🏠</Button>
      </Box>
    </>
  );
}

//以下に公開変数、関数を記載
export default ConfirmChild;
