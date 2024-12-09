// This component is for editing an image. It fetches the image by id and
// allows the user to edit the name, author, and description of the image.
// It also allows the user to upload a new image.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import imageCompression from "browser-image-compression";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../constants";

const EditForm = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [name, setName] = useState(""); // State for the name of the image
  const [author, setAuthor] = useState(""); // State for the author of the image
  const [description, setDescription] = useState(""); // State for the description of the image
  const [loading, setLoading] = useState(true); // State for whether the component is loading or not
  const [url, setUrl] = useState(null); // State for the URL of the image
  const [uploading, setUploading] = useState(false); // State for whether the component is uploading or not

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Get the document from Firestore
        const docRef = doc(db, "images", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Set the state with the data from the document
          const data = docSnap.data();
          setName(data.name);
          setAuthor(data.author);
          setDescription(data.description);
          setUrl(data.url);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false); // Set loading to false when the data has been fetched
      }
    };
    fetchImage();
  }, []);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Compress the image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = () => setUrl(reader.result);
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Set uploading to true when the form is submitted
    setUploading(true);
    const docRef = doc(db, "images", id);

    try {
      // Update the document in Firestore
      await updateDoc(docRef, {
        name,
        author,
        description,
        url,
      });
    } catch (error) {
      console.error("Error updating document:", error);
    } finally {
      // Set uploading to false when the document has been updated
      setUploading(false);
      window.location.href = "/";
    }
  };

  if (loading) {
    // If the component is loading, return a loader
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full max-w-lg bg-gray-700 p-6 rounded-md"
        onSubmit={handleSubmit}
      >
        {/* Form fields */}
        <div className="flex items-center gap-4">
          <div className="mb-5 w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New name
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light outline-none"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5 w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New Author
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light outline-none"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            New Description
          </label>
          <textarea
            className="h-40 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <label className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Upload New Image
            <input
              type="file"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
            />
          </label>

          <img src={url} alt="" className="w-full object-contain h-[400px]" />
        </div>

        <button
          className={`bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded block mx-auto mt-8 ${
            uploading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {uploading ? "Uploading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditForm;
