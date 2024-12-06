import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { colRef } from "../constants";
import Loader from "./Loader";

const Images = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getDocs(colRef);
        const imagesData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Images</h2>
      <ul>
        {images.map((image) => (
          <li key={image.id}>{image.name || "Unnamed Image"}</li>
        ))}
      </ul>
    </div>
  );
};

export default Images;
