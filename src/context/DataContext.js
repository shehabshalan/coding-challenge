/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const videosCollectionRef = collection(db, "videos");

  useEffect(() => {
    const unsub = onSnapshot(videosCollectionRef, (snapshot) => {
      let vid = [];
      snapshot.forEach((doc) => {
        vid.push({ ...doc.data(), id: doc.id });
      });
      setVideos(vid);
    });
    return () => unsub();
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
