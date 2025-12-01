import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Info = () => {
  const api = "https://to-dos-api.softclub.tj/api/to-dos";
  const apiUrl = "https://to-dos-api.softclub.tj/images";
  const [infoUser, setInfoUser] = useState({});
  const { id } = useParams();

  async function getByID() {
    try {
      const { data } = await axios.get(`${api}/${id}`);
      setInfoUser(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getByID();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">{infoUser?.name}</h1>

        {infoUser?.images?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {infoUser.images.map((img) => (
              <img
                key={img.imageName}
                src={`${apiUrl}/${img.imageName}`}
                alt={infoUser.name}
                className="w-full h-48 object-cover rounded-md"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </div>
    </div>
  );
};

export default Info;
