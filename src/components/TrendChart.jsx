import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function TrendChart({ reports }) {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const data = months.map((month, index) => ({
    month,
    complaints: reports.filter((r) => {
      if (!r.timestamp) return false;

      const date =
        r.timestamp?.toDate?.() ||
        new Date(r.timestamp);

      return date.getMonth() === index;
    }).length,
  }));

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
          📈 Monthly Complaint Trend
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={360}
        >
          <LineChart data={data}>
            <CartesianGrid
              stroke="#cbd5e1"
              strokeDasharray="4 4"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="complaints"
              stroke="#0f62fe"
              strokeWidth={4}
              dot={{
                r: 7,
                fill: "#2563eb",
                stroke: "#fff",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 10,
                fill: "#1d4ed8",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}