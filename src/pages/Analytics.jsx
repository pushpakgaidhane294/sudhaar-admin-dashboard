import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Chip,
  Typography
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { subscribeToReports } from "../services/firestoreService";

import AIInsights from "../components/AIInsights";
import CategoryChart from "../components/CategoryChart";
import ComplaintMap from "../components/ComplaintMap";
import RecentActivity from "../components/RecentActivity";
import StatusChart from "../components/StatusChart";
import TrendChart from "../components/TrendChart";

export default function Analytics() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToReports(setReports);
    return () => unsubscribe();
  }, []);

  const total = reports.length;
  const reported = reports.filter(r => r.status === 0).length;
  const validated = reports.filter(r => r.status === 1).length;
  const working = reports.filter(r => r.status === 2).length;
  const completed = reports.filter(r => r.status === 3).length;

  const cardStyle = {
    height: 160,
    borderRadius: 4,
    boxShadow: 3,
  };

  return (
    <div
      style={{
        padding: 30,
        background: "#f5f8fc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <div>
          <Typography variant="h4" fontWeight="bold">
            🏛 Smart City Control Room
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: 24,
              mb: 2,
              color: "#1e293b",
            }}
          >
            Analytics Overview
          </Typography>

          <Typography color="text.secondary">
            Live Municipal Analytics
          </Typography>
        </div>

        <Chip label="🟢 LIVE" color="success" />
      </div>

      {/* KPI */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {[
          {
            title: "Total",
            value: total,
            icon: (
              <AssignmentIcon
                color="primary"
                sx={{ fontSize: 40 }}
              />
            ),
          },
          {
            title: "Reported",
            value: reported,
            icon: (
              <PendingActionsIcon
                color="warning"
                sx={{ fontSize: 40 }}
              />
            ),
          },
          {
            title: "Validated",
            value: validated,
            icon: (
              <EngineeringIcon
                color="info"
                sx={{ fontSize: 40 }}
              />
            ),
          },
          {
            title: "Working",
            value: working,
            icon: (
              <EngineeringIcon
                color="secondary"
                sx={{ fontSize: 40 }}
              />
            ),
          },
          {
            title: "Completed",
            value: completed,
            icon: (
              <CheckCircleIcon
                color="success"
                sx={{ fontSize: 40 }}
              />
            ),
          },
        ].map((item) => (
          <Card key={item.title} sx={cardStyle}>
            <CardContent>
              {item.icon}

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {item.value}
              </Typography>

              <Typography color="text.secondary">
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MAP */}

      <ComplaintMap reports={reports} />

      {/* TREND + STATUS */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "25px",
          alignItems: "stretch",
        }}
      >
        <div style={{ flex: 3 }}>
          <TrendChart reports={reports} />
        </div>

        <div style={{ flex: 1 }}>
          <StatusChart reports={reports} />
        </div>
      </div>

      {/* CATEGORY + AI */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "25px",
          alignItems: "stretch",
        }}
      >
        <CategoryChart reports={reports} />

        <AIInsights reports={reports} />
      </div>

      <div
        style={{
          marginTop: "25px",
        }}
      >
        <RecentActivity reports={reports} />
      </div>

    </div>
  );
}