import {
    Alert,
    Card,
    CardContent,
    Divider,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";

export default function AIInsights({ reports }) {
  const total = reports.length;

  const pending = reports.filter(
    (r) => r.status === 0
  ).length;

  const progress = reports.filter(
    (r) => r.status === 1
  ).length;

  const completed = reports.filter(
    (r) => r.status === 2
  ).length;

  const potholes = reports.filter(
    (r) => r.type === "Pothole"
  ).length;

  const garbage = reports.filter(
    (r) => r.type === "Garbage"
  ).length;

  const lights = reports.filter(
    (r) =>
      r.type === "Street Light" ||
      r.type === "Streetlight"
  ).length;

  const completion =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  let highest = "Potholes";
  let highestValue = potholes;

  if (garbage > highestValue) {
    highest = "Garbage";
    highestValue = garbage;
  }

  if (lights > highestValue) {
    highest = "Street Lights";
    highestValue = lights;
  }

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
          gutterBottom
        >
          🤖 AI Insights
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>

          <Alert severity="info">
            Highest Complaint:
            <b> {highest}</b>
          </Alert>

          <Alert severity="warning">
            Pending Complaints:
            <b> {pending}</b>
          </Alert>

          <Alert severity="success">
            Completion Rate:
            <b> {completion}%</b>
          </Alert>

          <Typography fontWeight="bold">
            Overall Progress
          </Typography>

          <LinearProgress
            variant="determinate"
            value={completion}
            sx={{
              height: 12,
              borderRadius: 10,
            }}
          />

          <Typography variant="body2">
            Total : <b>{total}</b>
          </Typography>

          <Typography variant="body2">
            In Progress : <b>{progress}</b>
          </Typography>

          <Divider />

          <Typography color="text.secondary">
            💡 Recommendation
          </Typography>

          <Typography variant="body2">
            Deploy additional workers to
            <b> {highest}</b> complaints to
            reduce pending cases and improve
            completion rate.
          </Typography>

        </Stack>
      </CardContent>
    </Card>
  );
}