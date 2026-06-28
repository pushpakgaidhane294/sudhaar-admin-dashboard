import { NavLink } from "react-router-dom";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function Sidebar({role}) {
  const menuStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "15px",

    padding: "15px 20px",
    margin: "10px 15px",

    borderRadius: "14px",

    textDecoration: "none",

    color: "#ffffff",

    fontWeight: isActive ? "700" : "500",

    background: isActive
      ? "rgba(255,255,255,0.18)"
      : "transparent",

    backdropFilter: "blur(10px)",

    transition: "all .3s ease",

    boxShadow: isActive
      ? "0 8px 20px rgba(0,0,0,.18)"
      : "none",
  });

  return (
    <div
      style={{
        width: "270px",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        background:
          "linear-gradient(180deg,#0f4c81 0%, #1565c0 60%, #1e88e5 100%)",

        boxShadow: "6px 0 30px rgba(0,0,0,0.15)",
      }}
    >
      {/* ================= LOGO ================= */}

      <div>
        <div
          style={{
            padding: "25px 20px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,.15)",
          }}
        >
          <div
            style={{
              height: "5px",
              borderRadius: "20px",
              background:
                "linear-gradient(90deg,#FFD54F,#ffffff,#64B5F6)",
              marginBottom: "20px",
            }}
          />

          <AccountBalanceIcon
            sx={{
              fontSize: 55,
              color: "#FFD54F",
            }}
          />

          <h2
            style={{
              margin: "12px 0 5px",
              color: "#ffffff",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Sudhaar
          </h2>

          <p
            style={{
              margin: 0,
              color: "#dbeafe",
              fontSize: 13,
            }}
          >
            Municipal Management
          </p>
        </div>

        {/* ================= MENU ================= */}

        <div
          style={{
            marginTop: 35,
          }}
        >
          <NavLink
            to="/"
            style={menuStyle}
          >
            <DashboardIcon sx={{ fontSize: 24 }} />
            Dashboard
          </NavLink>

          <NavLink
            to="/complaints"
            style={menuStyle}
          >
            <AssignmentIcon sx={{ fontSize: 24 }} />
            Complaints
          </NavLink>
          {role === "admin" && (
            <NavLink
            to="/analytics"
            style={menuStyle}
            >
            <AnalyticsIcon sx={{ fontSize: 24 }} />
            Analytics
            </NavLink>
)}
        </div>

        {/* ================= USER CARD ================= */}

        <div
          style={{
            margin: "35px 18px",
            padding: "20px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.12)",
            textAlign: "center",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              margin: "0 auto",
              borderRadius: "50%",
              background: "#FFD54F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: "bold",
              color: "#0f4c81",
            }}
          >
            A
          </div>

          <h3
            style={{
              margin: "15px 0 5px",
              color: "#ffffff",
            }}
          >
            Administrator
          </h3>

          <p
            style={{
              margin: 0,
              color: "#dbeafe",
              fontSize: 13,
            }}
          >
            Municipal Officer
          </p>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#dbeafe",
          borderTop: "1px solid rgba(255,255,255,.15)",
          fontSize: 12,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          Version 1.0
        </div>

        <div
          style={{
            marginTop: 5,
          }}
        >
          © 2026 Sudhaar Portal
        </div>
      </div>
    </div>
  );
}