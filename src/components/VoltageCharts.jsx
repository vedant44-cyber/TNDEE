import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  //   Legend,
  ResponsiveContainer,
} from "recharts";

export const VoltageChart = ({ radii, voltages }) => {
  const data = radii.map((r, i) => ({
    radius: r * 100,
    voltage: voltages[i] / 1000,
  }));

  return (
    <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
      <h3 style={{ textAlign: "center", color: "#9F838C" }}>
        Voltage vs Radius
      </h3>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="radius"
            label={{
              margin: "1rem",
              value: "Radius (cm)",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Voltage (kV)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="voltage"
            name="Voltage (kV)"
            stroke="#ff5722"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
