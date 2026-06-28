import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  getReports,
  subscribeToReports,
} from "../services/firestoreService";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToReports((data) => {
      setReports(data);
    });

    return () => unsubscribe();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const total = reports.length;
  const pending = reports.filter(r => r.status === 0).length;
  const inProgress = reports.filter(r => r.status === 1).length;
  const completed = reports.filter(r => r.status === 2).length;

  const potholes = reports.filter(r => r.type === "Pothole").length;
  const garbage = reports.filter(r => r.type === "Garbage").length;
  const streetlights = reports.filter(
    r =>
      r.type === "Streetlight" ||
      r.type === "Street Light"
  ).length;

  const completion =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const statusData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed },
  ];

  const statusChip = (status) => {
    if (status === 0)
      return <Chip label="Pending" color="warning" />;
    if (status === 1)
      return (
        <Chip
          label="In Progress"
          color="primary"
        />
      );

    return (
      <Chip
        label="Completed"
        color="success"
      />
    );
  };

  const panelCard = {
    borderRadius: 4,
    border: "1px solid #b6d4fe",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 18px rgba(37, 99, 235, 0.12)",
  };

  return (
    <div
      style={{
        padding: "30px 32px 40px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #cfe8ff, #eaf4ff)",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <div>
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Dashboard
          </Typography>

          <Typography color="gray">
            Municipal Complaint Management
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={loadReports}
        >
          Refresh
        </Button>
      </div>

      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12} md={3}>
          <Card sx={panelCard}>
            <CardContent>
              <AssignmentIcon
                color="primary"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {total}
              </Typography>

              <Typography>
                Total Complaints
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={panelCard}>
            <CardContent>
              <PendingActionsIcon
                color="warning"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {pending}
              </Typography>

              <Typography>
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={panelCard}>
            <CardContent>
              <EngineeringIcon
                color="info"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {inProgress}
              </Typography>

              <Typography>
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={panelCard}>
            <CardContent>
              <CheckCircleIcon
                color="success"
                sx={{ fontSize: 40 }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {completed}
              </Typography>

              <Typography>
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          ...panelCard,
          mt: 4,
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#0f172a" }}
        >
          Completion Progress
        </Typography>

        <LinearProgress
          variant="determinate"
          value={completion}
          sx={{
            height: 14,
            borderRadius: 8,
            backgroundColor: "#e2e8f0",
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#0f4c81',
            },
          }}
        />

        <Typography
          mt={1}
          fontWeight="bold"
          sx={{ color: "#475569" }}
        >
          {completion}% Completed
        </Typography>
      </Card>

      <Grid
        container
        spacing={3}
        mt={4}
      >
        <Grid item xs={12} md={4}>
          <Card sx={panelCard}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#0f172a" }}
              >
                🕳 Potholes
              </Typography>

              <Typography
                variant="h3"
                sx={{ color: "#0f4c81" }}
              >
                {potholes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={panelCard}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#0f172a" }}
              >
                🗑 Garbage
              </Typography>

              <Typography
                variant="h3"
                sx={{ color: "#0f4c81" }}
              >
                {garbage}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={panelCard}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#0f172a" }}
              >
                💡 Street Lights
              </Typography>

              <Typography
                variant="h3"
                sx={{ color: "#0f4c81" }}
              >
                {streetlights}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4} justifyContent="center">
        <Grid
          item
          xs={12}
          lg={10}
          sx={{
            mx: "auto",
          }}
        >
          <Card
            sx={{
              ...panelCard,
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              mb={3}
              fontWeight={600}
            >
              Complaint Status Overview
            </Typography>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={statusData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#dbeafe"
                />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 14 }}
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  barSize={80}
                  radius={[8, 8, 0, 0]}
                >
                  <Cell fill="#f59e0b" />
                  <Cell fill="#1976d2" />
                  <Cell fill="#2e7d32" />

                  <LabelList
                    dataKey="value"
                    position="top"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          ...panelCard,
          mt: 4,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <CardContent>

          <Typography
            variant="h6"
            mb={2}
            sx={{ color: "#0f172a" }}
          >
            Recent Complaints
          </Typography>

          <table>

            <thead>

              <tr>
                <th>Title</th>
                <th>User</th>
                <th>Type</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {reports
                .slice(0, 5)
                .map(report => (

                  <tr key={report.id}>

                    <td>{report.title}</td>

                    <td>{report.userName}</td>

                    <td>{report.type}</td>

                    <td>
                      {statusChip(report.status)}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </CardContent>
      </Card>

    </div>
  );
}