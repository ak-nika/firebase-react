import { useEffect, useState } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { colRef } from "../constants";
import Loader from "./Loader";
import ImageCard from "./ImageCard";

const Images = () => {
  // State to store the list of images
  const [images, setImages] = useState([]);
  // State to manage the loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a Firestore query to order images by creation date, descending
    const q = query(colRef, orderBy("createdAt", "desc"));
    // Set up a real-time Firestore listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Map over the snapshot to extract image data and IDs
        const imagesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // Update the image state with the data fetched
        setImages(imagesData);
        // Set loading to false after data is fetched
        setLoading(false);
      },
      (error) => {
        // Log any errors during data fetching
        console.error("Error fetching real-time data:", error);
        // Set loading to false if an error occurs
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Render a loader component while the data is being fetched
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-8">
      <h2 className="text-3xl font-bold text-center my-12">Images</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
        {images.map((image) => (
          <ImageCard
            key={image.id} // Unique key for each image
            id={image.id} // Image ID
            url={image.url} // Image URL
            name={image.name} // Image name
            description={image.description} // Image description
            author={image.author} // Image author
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
