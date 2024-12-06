import { useEffect, useState } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { colRef } from "../constants";
import Loader from "./Loader";
import ImageCard from "./ImageCard";

const Images = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(colRef, orderBy("createdAt", "desc"));
    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const imagesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setImages(imagesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time data:", error);
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-8">
      <h2 className="text-3xl font-bold text-center my-12">Images</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            url={image.url}
            name={image.name}
            description={image.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
