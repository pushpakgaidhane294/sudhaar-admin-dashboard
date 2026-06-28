import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export default function CategoryChart({ reports }) {
  const potholes = reports.filter(
    (r) => r.type === "Pothole"
  ).length;

  const garbage = reports.filter(
    (r) => r.type === "Garbage"
  ).length;

  const streetlights = reports.filter(
    (r) =>
      r.type === "Street Light" ||
      r.type === "Streetlight"
  ).length;

  const data = [
    {
      name: "Potholes",
      value: potholes,
    },
    {
      name: "Garbage",
      value: garbage,
    },
    {
      name: "Street Lights",
      value: streetlights,
    },
  ];

  const COLORS = [
    "#1976d2",
    "#ff9800",
    "#4caf50",
  ];

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        height: 420,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          🍩 Complaint Categories
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={4}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}