import React, { useState, useMemo, useRef } from "react";
import { Container, Box, Grid, Paper, Button, Slide } from "@mui/material";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import ResultsBatchList from "./components/ResultsBatchList";
import ConfigSection from "./components/ConfigSection";
import ResultsDetailsSection from "./components/ResultsDetailsSection";
import { CsvEntry, ParsedData } from "./types";

const Dwells: React.FC = () => {
  const [activeBatch, setActiveBatch] = useState<string | null>("Overview");
  const [parsedData, setParsedData] = useState<ParsedData>({});
  const [fileSelected, setFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result: { data: CsvEntry[] }) => {
        if (result.data) {
          processCsvData(result.data);
        }
      },
      header: true,
    });

    setFileSelected(true);
  };

  const processCsvData = (data: CsvEntry[]) => {
    const processedData: ParsedData = {};

    data.forEach((entry) => {
      const batch =
        Math.floor(Number(entry.dwell.replace("h", "")) / 100) * 100;
      const batchKey = `${batch}h-${batch + 99}h`;

      processedData[batchKey] = processedData[batchKey] || {};
      processedData[batchKey][entry.processPath] = processedData[batchKey][
        entry.processPath
      ] || { total: 0, conditions: {} };
      processedData[batchKey][entry.processPath].total += 1;
      processedData[batchKey][entry.processPath].conditions[entry.condition] =
        (processedData[batchKey][entry.processPath].conditions[
          entry.condition
        ] || 0) + 1;
    });

    setParsedData(processedData);
  };

  const resetUpload = () => {
    setFileSelected(false);
  };

  const activeBatchData = useMemo(
    () => (activeBatch ? parsedData[activeBatch] : {}),
    [activeBatch, parsedData]
  );

  const offScreenRenderArea = useRef(null);

  const generatePDF = async () => {
    setIsLoading(true);

    const doc = new jsPDF("l", "mm", "a4");
    const batches = ["Overview", ...Object.keys(parsedData)];

    for (let i = 0; i < batches.length; i++) {
      setActiveBatch(batches[i]);

      await new Promise((r) => setTimeout(r, 2000));

      if (offScreenRenderArea.current) {
        const canvas = await html2canvas(offScreenRenderArea!.current, {
          scale: 2,
        });
        const imgData = canvas.toDataURL("image/png");

        const pageWidth = 297; // A4 width in mm for landscape mode
        const pageHeight = 210; // A4 height in mm for landscape mode
        let imgWidth = (canvas.width * pageHeight) / canvas.height;
        let imgHeight = pageHeight;

        if (imgWidth > pageWidth) {
          imgHeight = (canvas.height * pageWidth) / canvas.width;
          imgWidth = pageWidth;
        }

        const xOffset = (pageWidth - imgWidth) / 2;
        const yOffset = (pageHeight - imgHeight) / 2;

        if (i > 0) doc.addPage();
        doc.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      }
    }

    doc.save("results.pdf");
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        Generating PDF...
        <div
          ref={offScreenRenderArea}
          style={{
            position: "absolute",
            left: "-10000px",
            top: "-10000px",
            width: "100%",
          }}
        >
          <ResultsDetailsSection
            parsedData={parsedData}
            activeBatch={activeBatch}
            activeBatchData={activeBatchData}
          />
        </div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container>
        <div style={{ position: "relative" }}>
          <Slide
            direction="up"
            in={!fileSelected}
            timeout={750}
            appear={false}
            style={{
              position: fileSelected ? "absolute" : "relative",
              opacity: fileSelected ? 0 : 1,
              transition: "opacity 750ms",
            }}
          >
            <Box>
              <ConfigSection handleCsvUpload={handleCsvUpload} />
            </Box>
          </Slide>

          <Slide
            direction="up"
            in={fileSelected}
            timeout={750}
            style={{
              opacity: fileSelected ? 1 : 0,
              transition: "opacity 750ms",
            }}
          >
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetUpload}
                sx={{ marginBottom: "20px" }}
              >
                Reset and Upload a New CSV
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={generatePDF}
                sx={{ marginTop: "20px" }}
              >
                Generate PDF
              </Button>
              <Paper elevation={3} sx={{ borderRadius: "8px", mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{
                      paddingLeft: "4px !important",
                      paddingTop: "0px !important",
                    }}
                  >
                    <ResultsBatchList
                      activeBatch={activeBatch}
                      setActiveBatch={setActiveBatch}
                      parsedData={parsedData}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={9}
                    sx={{
                      paddingLeft: "0px !important",
                      paddingTop: "0px !important",
                    }}
                  >
                    {activeBatch && (
                      <ResultsDetailsSection
                        parsedData={parsedData}
                        activeBatch={activeBatch}
                        activeBatchData={activeBatchData}
                      />
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Slide>
        </div>
      </Container>
    </Box>
  );
};

export default Dwells;
