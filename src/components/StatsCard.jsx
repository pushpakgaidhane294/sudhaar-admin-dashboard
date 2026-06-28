import { Card, CardContent, Typography } from "@mui/material";

export default function StatsCard({ title, value }) {
  return (
    <Card sx={{ minWidth: 220 }}>
      <CardContent>
        <Typography color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}