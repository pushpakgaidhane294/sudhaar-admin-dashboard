import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ComplaintModal({
  open,
  onClose,
  report,
}) {
  if (!report) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Complaint Details
      </DialogTitle>

      <DialogContent>
        <img
          src={report.imageURL}
          alt=""
          width="100%"
          style={{
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />

        <h2>{report.title}</h2>

        <p>
          <b>Description:</b>{" "}
          {report.description}
        </p>

        <p>
          <b>Type:</b> {report.type}
        </p>

        <p>
          <b>User:</b> {report.userName}
        </p>

        <p>
          <b>ML Classification:</b>{" "}
          {report.ml?.classification || "N/A"}
        </p>

        <p>
          <b>Confidence:</b>{" "}
          {report.ml?.confidence
            ? report.ml.confidence.toFixed(2)
            : "N/A"}
          %
        </p>

        <p>
          <b>Status:</b>{" "}
          {report.status === 0
            ? "Pending"
            : report.status === 1
            ? "In Progress"
            : "Completed"}
        </p>
      </DialogContent>
    </Dialog>
  );
}