// This component renders a card for an image.
// It takes props for the image id, name, url, description, and author.
// It displays the image, name, author, description, and buttons to edit or delete the image.
// When the delete button is clicked, it prompts the user to confirm deletion.
// If the user confirms, it calls the useDelete hook to delete the image.
// If the deletion is successful, it displays a success message.
// If the deletion fails, it displays an error message.

import React from "react";
import Swal from "sweetalert2";
import useDelete from "../hooks/useDelete";
import { Link } from "react-router-dom";

const ImageCard = ({ id, name, url, description, author }) => {
  // This function is called when the delete button is clicked.
  // It prompts the user to confirm deletion, and if the user confirms,
  // it calls the useDelete hook to delete the image.
  const handleDelete = (imgId) => {
    // Prompt the user to confirm deletion
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // If the user confirms, call the useDelete hook to delete the image
      if (result.isConfirmed) {
        const deleted = await useDelete(imgId);

        // If the deletion is successful, display a success message
        if (deleted) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          // If the deletion fails, display an error message
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full h-[200px]">
        <img
          className="w-full h-full rounded-t-lg object-cover object-center"
          src={url}
          alt={name}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal my-2 text-gray-700 dark:text-gray-400">
          Added by:{" "}
          <span className="font-bold text-gray-700 dark:text-gray-400">
            {author}
          </span>
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>

        <div className="flex justify-between">
          <Link
            to={`/edit/${id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </Link>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
