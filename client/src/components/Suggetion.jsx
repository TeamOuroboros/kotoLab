import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Container,
  Typography,
  Button,
  Stack,
  Card,
  Radio,
  RadioGroup,
  CardContent,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { ArrowBack, Home } from "@mui/icons-material";

let sendAiMode = "おまかせ";

function Suggetion() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。
  const [value, setValue] = useState("");

  function goToMain() {
    navigate("/main");
  }

  function getAIMode(e) {
    setValue(e.target.value);
    sendAiMode = e.target.value;
  }

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Stack spacing={3} alignItems={"center"}>
        <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>
          提案について
        </Typography>

        <Typography variant="body2" textAlign={"center"}>
          AIである以上ばらつきがある可能性があります
        </Typography>

        <RadioGroup value={value} onChange={getAIMode}>
          <Stack spacing={2}>
            <Card
              variant="outlined"
              sx={{ bgcolor: "background.default", borderRadius: 2 }}
            >
              <CardContent>
                <FormControlLabel
                  value="おまかせ"
                  control={<Radio />}
                  label={
                    <>
                      <Typography fontWeight={"bold"}>おまかせ</Typography>
                      <Typography variant="body2">
                        過去の記録から満遍なく提案します
                      </Typography>
                    </>
                  }
                />
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              sx={{ bgcolor: "background.default", borderRadius: 2 }}
            >
              <CardContent>
                <FormControlLabel
                  value="アクティブ"
                  control={<Radio />}
                  label={
                    <>
                      <Typography fontWeight={"bold"}>アクティブ</Typography>
                      <Typography variant="body2">
                        なるべく外遊びを提案します
                      </Typography>
                    </>
                  }
                />
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              sx={{ bgcolor: "background.default", borderRadius: 2 }}
            >
              <CardContent>
                <FormControlLabel
                  value="おうち"
                  control={<Radio />}
                  label={
                    <>
                      <Typography fontWeight={"bold"}> おうち</Typography>
                      <Typography variant="body2">
                        家の中でできる過ごし方を中心に提案します
                      </Typography>
                    </>
                  }
                />
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              sx={{ bgcolor: "background.default", borderRadius: 2 }}
            >
              <CardContent>
                <FormControlLabel
                  value="屋内"
                  control={<Radio />}
                  label={
                    <>
                      <Typography fontWeight={"bold"}>屋内</Typography>
                      <Typography variant="body2">
                        屋内施設で過ごせる提案をします
                      </Typography>
                    </>
                  }
                />
              </CardContent>
            </Card>
          </Stack>
        </RadioGroup>

        {/* 左下 */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "fixed",
            bottom: 16,
            left: 16,
            bgcolor: "#B1CDC4",
            color: "#544739",
            width: 48,
            height: 48,
            borderRadius: "50%",
            "&:hover": {
              bgcolor: "#A0BEB5",
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* 右下 */}
        <IconButton
          onClick={() => navigate("/main")}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            bgcolor: "#B1CDC4",
            color: "#544739",
            width: 48,
            height: 48,
            borderRadius: "50%",
            "&:hover": {
              bgcolor: "#A0BEB5",
            },
          }}
        >
          <Home />
        </IconButton>
      </Stack>
    </Container>
  );
}

//以下に公開変数、関数を記載
export { Suggetion, sendAiMode };
