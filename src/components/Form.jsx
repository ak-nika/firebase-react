import React, { useState } from "react";

const Form = () => {
  const [url, setUrl] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-blue-800 to-gray-900 h-96"></div>
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p className="text-3xl font-bold leading-7 text-center text-white">
            Add Image
          </p>

          <form action="" method="post">
            <div className="md:flex items-center mt-12">
              <div className="w-full md:w-1/2 flex flex-col">
                <label className="font-semibold leading-none text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="font-semibold leading-none text-gray-300">
                  Author
                </label>
                <input
                  type="text"
                  className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                />
              </div>
            </div>

            <div>
              <div className="w-full flex flex-col mt-8">
                <label className="font-semibold leading-none text-gray-300">
                  Description
                </label>
                <textarea
                  type="text"
                  className="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-800 border-0 rounded"
                ></textarea>
              </div>
            </div>

            <div className="md:flex items-center mt-8">
              <div className="w-full flex flex-col items-center gap-4">
                <label className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                  Upload Image
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>

                <img
                  src={url}
                  alt=""
                  className="w-3/5 object-contain h-[400px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-full">
              <button className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
