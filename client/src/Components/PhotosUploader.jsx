import React, { useState } from "react";
import axios from "axios"

const PhotosUploader = ({addedPhotos, setAddedPhotos}) => {
    const [photoLink, setPhotoLink] = useState('')

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        try {
          const { data: fileName } = await axios.post("/upload-by-link", {
            link: photoLink,
          });
          setAddedPhotos((prev) => [...prev, fileName]);
          setPhotoLink(""); // Clear the input field
        } catch (error) {
          console.error("Error uploading photo:", error);
        }
      };
    
      const uploadPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
      
        for (let i = 0; i < files.length; i++) {
          data.append("photos", files[i]);
        }
      
        axios
          .post("/upload", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            const { data: fileNames } = res;
            setAddedPhotos((prev) => [...prev, ...fileNames]);
          })
          .catch((error) => {
            console.error("Error uploading photos:", error);
          });
      };

  return (
    <>
      <h2 className="text-2xl mt-4">Photos</h2>
      {/* photo upload using url */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="add using link...jpg"
          name="photoLink"
          onChange={(e)=>setPhotoLink(e.target.value)}
          value={photoLink}
        />
        <button
          className="bg-primary text-white rounded-lg text-nowrap px-5"
          onClick={addPhotoByLink}
        >
          Add photo
        </button>
      </div>
      {/* photo upload from device */}
      <p className="text-sm text-gray-500">Add more photos</p>
      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div key={index} className="h-32 flex">
              <img
                srcSet={"http://localhost:3001/uploads/" + link}
                alt="Hotel-image"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer border text-center border-primary bg-transparent rounded-2xl p-8 text-primary">
          <input
            type="file"
            multiple
            className="hidden"
            name="addedPhotos"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
