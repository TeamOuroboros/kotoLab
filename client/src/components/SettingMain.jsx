import { useNavigate } from "react-router";
import axios from "axios";

import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function settingMain() {
  const navigate = useNavigate();
  const Item = ({ label, to }) => (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={1}
      py={1.5}
    >
      <Typography>{label}</Typography>
      <Typography
        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
        onClick={() => to && navigate(to)}
      >
        ＞
      </Typography>
    </Box>
  );
  const processingLogout = async () => {
    await axios.post("api/auth/logout");
    alert("ログアウトしました");
    navigate("/");
  };
  return (
    <Container maxWidth="xs" sx={{ py: 4, bgcolor: "background.default" }}>
      <Paper
        elevation={1}
        sx={{ borderRadius: 3, p: 2, bgcolor: "background.default" }}
      >
        <Stack spacing={1}>
          {/* ヘッダー */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton onClick={() => navigate("/main")}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">設定</Typography>
            <Box width={48}></Box>
          </Box>

          <Divider />

          {/* メニュー項目 */}
          <Item label={"子供の追加"} to={"/register/children"} />
          <Item label={"子供の確認"} to={"/confirmchild"} />
          <Item label={"親の確認"} to={"/confirmparent"} />
          <Item label={"提案のカスタマイズ"} to={"/suggetion"} />
          <Item label={"データリセット"} to={"/resetdata"} />

          <Button sx={{ mt: 5 }} onClick={processingLogout}>
            ログアウト
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default settingMain;
