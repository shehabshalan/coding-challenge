/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const videosCollectionRef = collection(db, "videos");
  const getVideos = async () => {
    const data = await getDocs(videosCollectionRef);
    const allVideos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setVideos(allVideos.reverse());
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <DataContext.Provider
      value={{
        videos,
        setVideos,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
