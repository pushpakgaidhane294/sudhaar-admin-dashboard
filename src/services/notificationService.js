import { toast } from "react-toastify";

export const notifyNewComplaint = () => {
  toast.success("New Complaint Received 🚨");
};

export const notifyStatusChange = () => {
  toast.info("Complaint Status Updated");
};

export const notifyAssignChange = () => {
  toast.info("Complaint Assigned");
};