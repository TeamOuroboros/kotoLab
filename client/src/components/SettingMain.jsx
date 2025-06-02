import { useNavigate } from "react-router";

import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";

function settingMain() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Box>
        <Stack spacing={2}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>設定</Typography>
            <Button onClick={() => navigate("/main")}>戻る</Button>
          </Box>

          <Divider />

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>子供の追加</Typography>
            <Button onClick={() => navigate("/register/children")}>＞</Button>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>子供の確認</Typography>
            <Button onClick={() => navigate("/confirmchild")}>＞</Button>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography> 提案のカスタマイズ</Typography>
            <Button onClick={() => navigate("/suggetion")}>＞</Button>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography> データリセット</Typography>
            <Button>＞</Button>
          </Box>

          <Button>ログアウト</Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default settingMain;
