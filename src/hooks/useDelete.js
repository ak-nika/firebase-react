// This custom hook is used to delete an image document from the Firestore database.
// It takes the id of the document to be deleted as a parameter.
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../constants";

const useDelete = (id) => {
  // This is the function that is called when the user wants to delete an image.
  const deleteImage = async () => {
    const docRef = doc(db, "images", id); // Create a reference to the document to be deleted.

    try {
      await deleteDoc(docRef); // Delete the document.
      return true; // Return true if deletion is successful.
    } catch (error) {
      console.error("Error deleting document:", error); // Log any errors that occur during deletion.
      return false; // Return false if deletion fails.
    }
  };

  return deleteImage; // Return the deleteImage function.
};

export default useDelete; // Export the useDelete hook.
