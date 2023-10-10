import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Slider,
  Grid,
  Alert,
} from "@mui/material";

import JsBarcode from "jsbarcode";
import ScrollToTopFab from "../../components/ScrollToTopFab";

const barcodeTypes = [
  { value: "CODE128", text: "CODE128" },
  { value: "CODE39", text: "CODE39" },
  { value: "EAN2", text: "EAN2" },
  { value: "EAN5", text: "EAN-5" },
  { value: "EAN8", text: "EAN-8" },
  { value: "EAN13", text: "EAN-13" },
  { value: "UPC", text: "UPC" },
  { value: "ITF", text: "ITF" },
  { value: "MSI", text: "MSI" },
  { value: "pharmacode", text: "Pharmacode" },
];

const BarcodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [generatedBarcodes, setGeneratedBarcodes] = useState<string[]>([]);
  const [barcodeType, setBarcodeType] = useState("CODE128");
  const [barcodeScale, setBarcodeScale] = useState(1.25);
  const [barcodeItemMargin, setBarcodeItemMargin] = useState(50);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    const entries = inputText
      .split("\n")
      .filter((entry) => entry.trim() !== "");
    const generatedSVGs: string[] = [];

    try {
      entries.forEach((entry) => {
        const trimmedEntry = entry.trim();
        const svgElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        JsBarcode(svgElement, trimmedEntry, {
          format: barcodeType,
          width: 2 * barcodeScale,
          height: 100 * barcodeScale,
          displayValue: true,
        });
        generatedSVGs.push(svgElement.outerHTML);
      });

      setGeneratedBarcodes(generatedSVGs);
      setError(null);
    } catch (e) {
      setError("Invalid barcode input for the selected type.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom align="center" color="primary">
          Barcode Generator
        </Typography>

        <Card sx={{ marginBottom: "20px" }}>
          <CardHeader title="Configuration" />
          <CardContent>
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Barcode Scale: {barcodeScale}
                  </Typography>
                  <Slider
                    value={barcodeScale}
                    onChange={(_, newValue) =>
                      setBarcodeScale(newValue as number)
                    }
                    step={0.05}
                    marks
                    min={0.5}
                    max={2}
                    valueLabelDisplay="off"
                  />
                </Box>

                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Barcode Gap (px): {barcodeItemMargin}
                  </Typography>
                  <Slider
                    value={barcodeItemMargin}
                    onChange={(_, newValue) =>
                      setBarcodeItemMargin(newValue as number)
                    }
                    step={5}
                    marks
                    min={5}
                    max={150}
                    valueLabelDisplay="off"
                  />
                </Box>

                <FormControl fullWidth sx={{ marginTop: 8 }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    label="Type"
                    id="demo-simple-select-label"
                    value={barcodeType}
                    onChange={(e) => setBarcodeType(e.target.value)}
                    sx={{ color: "white" }}
                  >
                    {barcodeTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  multiline
                  margin="dense"
                  rows={10}
                  placeholder="Enter each barcode on a new line..."
                  label="Enter Barcodes"
                  variant="outlined"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  InputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGenerate}
              >
                Generate Barcode(s)
              </Button>
            </Box>
          </CardContent>
        </Card>
        {error && <Alert severity="error">{error}</Alert>}
        <Card style={{ marginTop: "20px" }}>
          <CardHeader title="Generated Barcodes" />
          <CardContent>
            <Box>
              {generatedBarcodes.map((svg, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: svg }}
                  style={{ margin: `${barcodeItemMargin}px auto` }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
        <ScrollToTopFab />
      </Container>
    </Box>
  );
};

export default BarcodeGenerator;
