import { useEffect, useMemo, useState } from "react";

import {
  deleteComplaint,
  getReports,
  updateComplaintStatus,
} from "../services/firestoreService";

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import { getWorkers } from "../services/userService";

export default function Complaints({role}) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedReport, setSelectedReport] =
    useState(null);
  const [workers, setWorkers] = useState([]);
  const [viewOpen, setViewOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  const [snackbar, setSnackbar] =
    useState({
      open: false,
      message: "",
      severity: "success",
    });

  useEffect(() => {
  loadReports();
  loadWorkers();
}, []);

const loadWorkers = async () => {
  try {
    const data = await getWorkers();
    setWorkers(data);
  } catch (error) {
    console.log(error);
  }
};

  const loadReports = async () => {
    try {
      setLoading(true);

      const data = await getReports();

      setReports(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (status) => {
    if (status === 0) return "Reported";
    if (status === 1) return "Validated";
    if (status === 2) return "Working";
    if (status === 3) return "Completed";
    return "Unknown";
  };

  const getStatusColor = (status) => {
    if (status === 0) return "#ef4444";
    if (status === 1) return "#f59e0b";
    if (status === 2) return "#2563eb";
    if (status === 3) return "#16a34a";
    return "#6b7280";
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "red";
    if (priority === "Medium") return "orange";
    return "green";
  };

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await updateComplaintStatus(
        id,
        status
      );

      loadReports();

      setSnackbar({
        open: true,
        message:
          "Complaint updated successfully.",
        severity: "success",
      });
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message:
          "Failed to update complaint.",
        severity: "error",
      });
    }
  };

  const handleAssign = async (
    id,
    assignedTo
  ) => {
    try {
      await updateComplaintStatus(id, {
        assignedTo,
      });
      loadReports();
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message:
          "Failed to assign complaint.",
        severity: "error",
      });
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteComplaint(deleteId);

      setDeleteOpen(false);

      loadReports();

      setSnackbar({
        open: true,
        message:
          "Complaint deleted successfully.",
        severity: "success",
      });
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message:
          "Delete failed.",
        severity: "error",
      });
    }
  };

  const exportCSV = () => {
    const rows = [
      [
        "Title",
        "Type",
        "User",
        "Status",
      ],
    ];

    reports.forEach((r) => {
      rows.push([
        r.title,
        r.type,
        r.userName,
        getStatus(r.status),
      ]);
    });

    const csv =
      rows
        .map((e) => e.join(","))
        .join("\n");

    const blob = new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "complaints.csv";

    link.click();
  };

  const filteredReports =
    useMemo(() => {
      let data = [...reports];

      data = data.filter((r) => {
        const searchMatch =
          r.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          r.userName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          r.type
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const statusMatch =
          statusFilter === "All"
            ? true
            : getStatus(
                r.status
              ) === statusFilter;

        const typeMatch =
          typeFilter === "All"
            ? true
            : r.type === typeFilter;

        return (
          searchMatch &&
          statusMatch &&
          typeMatch
        );
      });

      if (
        sortBy === "Pending"
      ) {
        data.sort(
          (a, b) =>
            a.status -
            b.status
        );
      }

      if (
        sortBy ===
        "Completed"
      ) {
        data.sort(
          (a, b) =>
            b.status -
            a.status
        );
      }

      return data;
    }, [
      reports,
      search,
      statusFilter,
      typeFilter,
      sortBy,
    ]);

  const total =
    filteredReports.length;

  const reported =
    filteredReports.filter((r) => r.status === 0).length;

  const validated =
    filteredReports.filter((r) => r.status === 1).length;

  const working =
    filteredReports.filter((r) => r.status === 2).length;

  const completed =
    filteredReports.filter((r) => r.status === 3).length;
      return (
    <div
      style={{
        padding: "30px 32px 40px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fffaf0 0%, #f8fafc 100%)",
      }}
    >
      <h1
        className="page-title"
        style={{
          color: "#0f172a",
          marginBottom: 20,
          borderBottom: "3px solid #ff9800",
          display: "inline-block",
          paddingBottom: 8,
        }}
      >
        Complaint Management
      </h1>

      {/* Toolbar */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Search Complaint"
          size="small"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{ minWidth: 260 }}
        />

        <TextField
          select
          label="Status"
          size="small"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          style={{ width: 170 }}
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Reported">
            Reported
          </MenuItem>

          <MenuItem value="Validated">
            Validated
          </MenuItem>

          <MenuItem value="Working">
            Working
          </MenuItem>

          <MenuItem value="Completed">
            Completed
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Type"
          size="small"
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
          style={{ width: 170 }}
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Pothole">
            Pothole
          </MenuItem>

          <MenuItem value="Garbage">
            Garbage
          </MenuItem>

          <MenuItem value="Streetlight">
            Streetlight
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Sort"
          size="small"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          style={{ width: 170 }}
        >
          <MenuItem value="Newest">
            Newest
          </MenuItem>

          <MenuItem value="Pending">
            Pending First
          </MenuItem>

          <MenuItem value="Completed">
            Completed First
          </MenuItem>
        </TextField>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            onClick={loadReports}
          >
            Refresh
          </Button>

          <Button
            color="success"
            variant="contained"
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Statistics */}

      <div
        className="dashboard-cards"
        style={{
          marginBottom: "25px",
        }}
      >
        <div className="card">
          <h2>{total}</h2>
          <p>Total</p>
        </div>

        <div className="card">
          <h2>{reported}</h2>
          <p>Reported</p>
        </div>

        <div className="card">
          <h2>{validated}</h2>
          <p>Validated</p>
        </div>

        <div className="card">
          <h2>{working}</h2>
          <p>Working</p>
        </div>

        <div className="card">
          <h2>{completed}</h2>
          <p>Completed</p>
        </div>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>User</th>
              <th>ML Result</th>
              <th>Confidence</th>
              <th>Status</th>
              <th>View</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan="10">
                  <div
                    style={{
                      padding: "40px",
                      fontSize: "18px",
                      color: "#666",
                    }}
                  >
                    No complaints found.
                  </div>
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <img
                      src={report.imageURL}
                      alt="Complaint"
                      width="90"
                      style={{
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td>{report.title}</td>

                  <td>{report.type}</td>

                  <td
                    style={{
                      color: getPriorityColor(
                        report.priority
                      ),
                      fontWeight: "bold",
                    }}
                  >
                    {report.priority || "Low"}
                  </td>
  <td>
  {role === "admin" ? (
    <select
      value={report.assignedTo || ""}
      onChange={(e) =>
        handleAssign(report.id, e.target.value)
      }
      style={{
        width: "170px",
        padding: "8px",
        borderRadius: "6px",
      }}
    >
      <option value="">
        Select Worker
      </option>

      {workers.map((worker) => (
        <option
          key={worker.id}
          value={worker.name}
        >
          {worker.name}
        </option>
      ))}
    </select>
  ) : (
    <span>
      {report.assignedTo || "Not Assigned"}
    </span>
  )}
</td>
                  <td>{report.userName}</td>
                  <td>
                    {report.ml?.classification ||
                      "N/A"}
                  </td>

                  <td>
                    {report.ml?.confidence
                      ? `${report.ml.confidence.toFixed(
                          2
                        )}%`
                      : "N/A"}
                  </td>

                  <td>
                    <span
                      style={{
                        background:
                          getStatusColor(
                            report.status
                          ),
                        color: "white",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        fontWeight:
                          "bold",
                        display:
                          "inline-block",
                      }}
                    >
                      {getStatus(
                        report.status
                      )}
                    </span>
                  </td>

                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedReport(
                          report
                        );
                        setViewOpen(true);
                      }}
                    >
                      View
                    </Button>
                  </td>

                  <td>
                    {/* Reported */}
                    {report.status === 0 && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() =>
                          handleStatusChange(report.id, 1)
                        }
                      >
                        Validate
                      </Button>
                    )}

                    {/* Validated */}
                    {report.status === 1 && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() =>
                            handleStatusChange(report.id, 0)
                          }
                        >
                          Back
                        </Button>

                        <Button
                          variant="contained"
                          color="info"
                          onClick={() =>
                            handleStatusChange(report.id, 2)
                          }
                        >
                          Start Work
                        </Button>
                      </div>
                    )}

                    {/* Working */}
                    {report.status === 2 && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() =>
                            handleStatusChange(report.id, 1)
                          }
                        >
                          Back
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleStatusChange(report.id, 3)
                          }
                        >
                          Complete
                        </Button>
                      </div>
                    )}

                    {/* Completed */}
                    {report.status === 3 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleStatusChange(report.id, 2)
                        }
                      >
                        Reopen
                      </Button>
                    )}
                  </td>

                  <td>
  {role === "admin" && (
    <Button
      color="error"
      variant="contained"
      onClick={() =>
        confirmDelete(report.id)
      }
    >
      Delete
    </Button>
  )}
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}      {/* View Complaint Dialog */}

      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Complaint Details
        </DialogTitle>

        <DialogContent>
          {selectedReport && (
            <>
              <img
                src={selectedReport.imageURL}
                alt="Complaint"
                width="100%"
                style={{
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />

              <h2>{selectedReport.title}</h2>

              <p>
                <b>Description:</b>{" "}
                {selectedReport.description}
              </p>

              <p>
                <b>Type:</b>{" "}
                {selectedReport.type}
              </p>

              <p>
                <b>User:</b>{" "}
                {selectedReport.userName}
              </p>

              <p>
                <b>ML Classification:</b>{" "}
                {selectedReport.ml?.classification ||
                  "N/A"}
              </p>

              <p>
                <b>Confidence:</b>{" "}
                {selectedReport.ml?.confidence
                  ? `${selectedReport.ml.confidence.toFixed(
                      2
                    )}%`
                  : "N/A"}
              </p>

              <p>
                <b>Status:</b>{" "}
                {getStatus(
                  selectedReport.status
                )}
              </p>
              {selectedReport.location && (
  <>
    <p>
      <b>Latitude:</b>{" "}
      {selectedReport.location.latitude}
    </p>

    <p>
      <b>Longitude:</b>{" "}
      {selectedReport.location.longitude}
    </p>

    <div
      style={{
        marginTop: "20px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <iframe
        title="Google Map"
        width="100%"
        height="350"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://maps.google.com/maps?q=${selectedReport.location.latitude},${selectedReport.location.longitude}&z=16&output=embed`}
        allowFullScreen
      />
    </div>

    <button
      style={{
        marginTop: "15px",
        background: "#16a34a",
      }}
      onClick={() =>
        window.open(
          `https://www.google.com/maps?q=${selectedReport.location.latitude},${selectedReport.location.longitude}`,
          "_blank"
        )
      }
    >
      📍 Open in Google Maps
    </button>
  </>
)}
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setViewOpen(false)
            }
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}

      <Dialog
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
      >
        <DialogTitle>
          Delete Complaint
        </DialogTitle>

        <DialogContent>
          Are you sure you want to delete
          this complaint?
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
