import { useState } from "react";
import { Slider, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { calculateTND } from "./components/calc";
import { VoltageChart } from "./components/VoltageCharts";
import "./styles.css";
import ParticlesComponent from "./components/particles";

export default function Calculate() {
  const [voltage, setVoltage] = useState(100);
  const [sheathDiameter, setSheathDiameter] = useState(20);
  const [coreDiameter, setCoreDiameter] = useState(10);
  const [count, setCount] = useState(3);
  const [error, setError] = useState(false);  
  const { alpha, radii, voltages, gMaxWithout, gMaxWith } = calculateTND(
    voltage * 1000,
    sheathDiameter / 100,
    coreDiameter / 100,
    count
  );

  const marks = [
    { value: 0, label: "0" },
    { value: 100, label: "100" },
    { value: 200, label: "200" },
    { value: 300, label: "300" },
    { value: 400, label: "400" },
  ];

  const marksCable = [
    { value: 0, label: "0" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
  ];

  const marksCount = [
    { value: 0, label: "0" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ];

  return (
    <div className="App">
      <ParticlesComponent id="particles" />

      <Box className="slider-section">
        <Box className="inputs">
          <Typography gutterBottom sx={{ mt: 2, fontSize:"20" }}>Voltage: {voltage} kV</Typography>
          <Slider
            value={voltage}
            onChange={(e, val) => setVoltage(val)}
            step={1}
            marks={marks}
            min={0}
            max={400}
            className="animated-slider"
            sx={{
              "& .MuiSlider-markLabel": {
                color: "white",
              },
            }}
          />

          <Typography gutterBottom sx={{ mt: 2, fontSize:"20" }}>
            Sheath Diameter: {sheathDiameter} cm
          </Typography>
          <Slider
            value={sheathDiameter}
            onChange={(e, val) => {
              if (val > coreDiameter) {
                setError(false);
                setSheathDiameter(val);
              } else {
                setError(true);
              }
            }}
    
            step={0.5}
            marks={marksCable}
            min={0}
            max={50}
            className="animated-slider"
            sx={{
              "& .MuiSlider-markLabel": {
                color: "white",
              },
            }}
          />

          <Typography gutterBottom sx={{ mt: 2, fontSize:"20" }}>Core Diameter: {coreDiameter} cm</Typography>
          <Slider
            value={coreDiameter}
            onChange={(e, val) => {
    if (val < sheathDiameter) {
      setError(false);
      setCoreDiameter(val);
    } else {
      setError(true);
    }
  }}
            step={0.5}
            marks={marksCable}
            min={0}
            max={50}
            className="animated-slider"
            sx={{
              "& .MuiSlider-markLabel": {
                color: "white",
              },
            }}
          />
          {error && (
            <Typography 
              color="error"   
              sx={{ mt: 1 ,color: "#ffb703",fontSize:"15" }}
            >
            Sheath Diameter must be greater than Core Diameter
            </Typography>
          )}

          
          <Typography gutterBottom sx={{ mt: 2, fontSize:"20" }}>Number of Inner Sheaths: {count}</Typography>
          <Slider
            value={count}
            onChange={(e, val) => setCount(val)}
            step={1}
            marks={marksCount}
            min={0}
            max={10}
            className="animated-slider"
            sx={{
              "& .MuiSlider-markLabel": {
                color: "white",
              },
            }}
          />
        </Box>

        <Box className="results">
          <Typography variant="h5" gutterBottom>
            Results
          </Typography>

          
          <TableContainer component={Paper} >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" >Inter-sheath </TableCell>
                  <TableCell align="center" >Diameter (cm)</TableCell>
                  <TableCell align="center" >Voltage (kV)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {radii.map((radius, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ mt: 2, fontSize:"20" }}>{index + 1}</TableCell>
                    <TableCell align="center"sx={{ mt: 2, fontSize:"20" }}>{(radius * 200).toFixed(2)}</TableCell>
                    <TableCell align="center"sx={{ mt: 2, fontSize:"20" }}>{(voltages[count-index-1] / 1000).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body1" sx={{ mt: 2  }}>
            Potential Gradient at Core Surface (with inter-sheaths): {(gMaxWith/100000).toFixed(2)} kV/cm
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Potential Gradient (without inter-sheaths): {(gMaxWithout/100000).toFixed(2)} kV/cm
          </Typography>
        </Box>
      </Box>

      {/* Graph Section */}
      <VoltageChart radii={radii} voltages={voltages} />
    </div>
  );
}