import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function StatusChart({ reports }) {
  const data = [
    {
      status: "Pending",
      value: reports.filter((r) => r.status === 0).length,
    },
    {
      status: "In Progress",
      value: reports.filter((r) => r.status === 1).length,
    },
    {
      status: "Completed",
      value: reports.filter((r) => r.status === 2).length,
    },
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
          📊 Complaint Status
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={360}
        >
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="#cbd5e1"
              strokeDasharray="4 4"
            />

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="status"
              width={90}
            />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#14b8a6"
              radius={[12, 12, 12, 12]}
              barSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}