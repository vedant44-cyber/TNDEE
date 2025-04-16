import { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";
import { calculateTND } from "./components/calc";
import { VoltageChart } from "./components/VoltageCharts";
import "./styles.css";
import ParticlesComponent from "./components/particles";

export default function Calculate() {
  const [voltage, setVoltage] = useState(100);
  const [sheathDiameter, setSheathDiameter] = useState(20);
  const [coreDiameter, setCoreDiameter] = useState(10);
  const [count, setCount] = useState(3);

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
          <Typography gutterBottom>Voltage: {voltage} kV</Typography>
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

          <Typography gutterBottom>
            Sheath Diameter: {sheathDiameter} cm
          </Typography>
          <Slider
            value={sheathDiameter}
            onChange={(e, val) => setSheathDiameter(val)}
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

          <Typography gutterBottom>Core Diameter: {coreDiameter} cm</Typography>
          <Slider
            value={coreDiameter}
            onChange={(e, val) => setCoreDiameter(val)}
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

          <Typography gutterBottom>Number of Inner Sheaths: {count}</Typography>
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

          <Typography variant="body1">
            <strong>Alpha:</strong> {alpha.toFixed(3)}
          </Typography>

          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            <strong>Diameter</strong>
          </Typography>
          <ul>
            {radii.map((val, i) => (
              <li key={i}>
                d{i}: {(val * 200).toFixed(4)} cm
              </li>
            ))}
          </ul>

          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            <strong>Voltages:</strong>
          </Typography>
          <ul>
            {voltages.map((v, i) => {
              if (i % 2 !== 0) return null;
              return (
                <li key={i}>
                  V{i + 1}: {voltages[i].toFixed(2)} V, V{i + 2}:{" "}
                  {voltages[i + 1]?.toFixed(2)} V
                </li>
              );
            })}
          </ul>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Max Potential Gradient without inner sheath:</strong>{" "}
            {(gMaxWithout/1000)} kV/m
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Max Potential Gradient with inner sheath:</strong>{" "}
            {(gMaxWith/1000 )} kV/m
          </Typography>
        </Box>
      </Box>

      {/* Graph Section */}
      <VoltageChart radii={radii} voltages={voltages} />
    </div>
  );
}
