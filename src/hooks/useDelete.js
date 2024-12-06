import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../constants";

const useDelete = (id) => {
  const deleteImage = async () => {
    const docRef = doc(db, "images", id);

    try {
      await deleteDoc(docRef);
      return true; // Return true if deletion is successful
    } catch (error) {
      console.error("Error deleting document:", error);
      return false; // Return false if deletion fails
    }
  };

  return deleteImage();
};

export default useDelete;
