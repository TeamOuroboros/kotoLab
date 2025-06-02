import { Box } from "@yamada-ui/react";
import { Separator } from "@yamada-ui/react";
import { Text } from "@yamada-ui/react";
import { Button, ButtonGroup } from "@yamada-ui/react";
import { useNavigate } from "react-router";

function settingMain() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  function goToMain() {
    navigate("/main");
  }
  function goToAddChild() {
    navigate("/addchild");
  }
  function goToComfirmChild() {
    navigate("/confirmchild");
  }
  function goToSuggetionCustomizaiton() {
    navigate("/suggetion");
  }
  function goToRogin() {
    navigate("");
  }

  return (
    <>
      <Box p="md" rounded="md" bg="primary">
        <Text>
          設定<Button onClick={goToMain}>戻る</Button>
        </Text>
        <Separator variant={"solid"} />
        <Text>
          子供の追加<Button onClick={goToAddChild}>＞</Button>
        </Text>
        <Text>
          子供の確認<Button onClick={goToComfirmChild}>＞</Button>
        </Text>
        <Text>
          提案のカスタマイズ
          <Button onClick={goToSuggetionCustomizaiton}>＞</Button>
        </Text>
        <Text>
          データリセット<Button>＞</Button>
        </Text>
        <Button onClick={goToRogin}>ログアウト</Button>
      </Box>
    </>
  );
}

export default settingMain;
