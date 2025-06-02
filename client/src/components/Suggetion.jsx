import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Card,
  Radio,
  RadioGroup,
  CardContent,
  FormControlLabel,
} from "@mui/material";
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
    // console.log("🚀 ~ getAIMode ~ sendAiMode:", sendAiMode);
  }

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Stack spacing={3} alignItems={"center"}>
        <Typography variant="h5" fontWeight={"bold"} textAlign={"center"}>
          提案について
        </Typography>

        <Typography variant="body2" textAlign={"center"}>
          AIである以上ばらつきがある可能性があります
        </Typography>

        <RadioGroup value={value} onChange={getAIMode}>
          <Stack spacing={2}>
            <Card variant="outlined">
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

            <Card variant="outlined">
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

            <Card variant="outlined">
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

            <Card variant="outlined">
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

        <Button onClick={goToMain}>🏠</Button>
      </Stack>
    </Container>
  );
}

//以下に公開変数、関数を記載
export { Suggetion, sendAiMode };
