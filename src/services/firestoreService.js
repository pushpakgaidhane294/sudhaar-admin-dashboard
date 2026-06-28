import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase";

export const getReports = async () => {
  const snapshot = await getDocs(
    collection(db, "reports")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateComplaintStatus = async (
  id,
  statusOrUpdate
) => {
  const reportRef = doc(db, "reports", id);

  const updateData =
    typeof statusOrUpdate === "object" &&
    statusOrUpdate !== null
      ? statusOrUpdate
      : { status: statusOrUpdate };

  await updateDoc(reportRef, updateData);
};
export const deleteComplaint = async (id) => {
  const reportRef = doc(db, "reports", id);

  await deleteDoc(reportRef);
};
export const subscribeToReports = (callback) => {
  return onSnapshot(
    collection(db, "reports"),
    (snapshot) => {
      const reports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(reports);
    }
  );
};