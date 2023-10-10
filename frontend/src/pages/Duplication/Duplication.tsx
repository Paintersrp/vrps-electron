import React, { useState } from "react";
import { Typography, Grid, Box, useTheme, Container } from "@mui/material";

import ConfigurationCard from "./components/ConfigurationCard";
import InputCard from "./components/InputCard";
import ResultsCard from "./components/ResultsCard";
import Snackbars from "./components/Snackbars";
import ScrollToTopFab from "../../components/ScrollToTopFab";

const DuplicationPage: React.FC = () => {
  const theme = useTheme();
  const [inputStr, setInputStr] = useState("");
  const [result, setResult] = useState("");
  const [duplicationCount, setDuplicationCount] = useState(4);
  const [copied, setCopied] = useState(false);
  const [cleared, setCleared] = useState(false);

  React.useEffect(() => {
    updateResult(inputStr, duplicationCount);
  }, [inputStr, duplicationCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStr(e.target.value);
    updateResult(e.target.value, duplicationCount);
  };

  const updateResult = (input: string, count: number) => {
    const values = input.split(/[,;\n\s]+/).map((s) => s.trim());

    let output = "";

    values.forEach((val) => {
      output += `${val}\n`.repeat(count);
    });

    setResult(output.trim());
  };

  const handleClear = () => {
    setInputStr("");
    setResult("");
    setCleared(true);
  };

  const handleCopy = () => {
    if (window.electronAPI) {
      window.electronAPI.copyToClipboard(result);
    }
    setCopied(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom align="center" color="primary">
          Batch ID Duplicator
        </Typography>
        <ConfigurationCard
          duplicationCount={duplicationCount}
          setDuplicationCount={setDuplicationCount}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <InputCard
              inputStr={inputStr}
              handleInputChange={handleInputChange}
              handleClear={handleClear}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ResultsCard result={result} handleCopy={handleCopy} />
          </Grid>
        </Grid>
        <Snackbars
          copied={copied}
          cleared={cleared}
          theme={theme}
          setCopied={setCopied}
          setCleared={setCleared}
        />
      </Container>
      <ScrollToTopFab />
    </Box>
  );
};

export default DuplicationPage;
