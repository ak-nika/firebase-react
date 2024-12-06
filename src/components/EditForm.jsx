import { useParams, useState } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams();
  const [url, setUrl] = useState(null);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
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
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-lg bg-gray-700 p-6 rounded-md">
        <div className="flex items-center gap-4">
          <div className="mb-5 w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New name
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          e
          <div className="mb-5 w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New Author
            </label>
            <input
              type="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            for="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Description
          </label>
          <textarea className="h-40 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"></textarea>
        </div>

        <div>
          <label>
            Upload New Image
            <input
              type="file"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
            />
          </label>

          <img src={url} alt="" className="w-3/5 object-contain h-[400px]" />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
