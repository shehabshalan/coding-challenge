/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";
import durationFormat from "../utils/utils";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const history = useHistory();

  const [videos, setVideos] = useState([]);
  const [thumbnail, setThumbail] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [commentsAllowed, setCommentsAllowed] = useState(false);
  const [data, setData] = useState({});
  const [progressVideo, setProgressVideo] = useState(0);
  const [progressImage, setProgressImage] = useState(0);
  const videosCollectionRef = collection(db, "videos");

  const getVideos = async () => {
    const data = await getDocs(videosCollectionRef);
    const allVideos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setVideos(allVideos);
  };

  useEffect(() => {
    getVideos();
  }, []);

  const handleVideoLength = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      var audio = new Audio(reader.result);
      audio.onloadedmetadata = function () {
        // setData()
        const duration = durationFormat(audio.duration);
        setData({ ...data, duration: duration });
      };
    };
    reader.readAsDataURL(file);
    setVideo(file);
  };
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + thumbnail.name;
      const storageRef = ref(storage, `thumbnails/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, thumbnail);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgressImage(progress);
          switch (snapshot.state) {
            case "paused":
              //   console.log("Upload is paused");
              break;
            case "running":
              //   console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, thumbnail: downloadURL }));
          });
        }
      );
    };
    thumbnail && uploadFile();
  }, [thumbnail]);
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + video.name;
      const storageRef = ref(storage, `videos/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, video);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgressVideo(progress);
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, path: downloadURL }));
          });
        }
      );
    };
    video && uploadFile();
  }, [video]);

  useEffect(() => {
    setData({ ...data, commentsAllowed });
  }, [commentsAllowed]);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVideo = {
      ...data,
      datetime: serverTimestamp(),
      comments: [],
    };
    console.log(newVideo);
    try {
      await addDoc(videosCollectionRef, newVideo);
      alert("uploaded");
      setVideos((prev) => [...prev, newVideo]);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <DataContext.Provider
      value={{
        videos,
        setVideos,
        handleSubmit,
        video,
        setVideo,
        thumbnail,
        setThumbail,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        commentsAllowed,
        setCommentsAllowed,
        handleInput,
        handleVideoLength,
        progressImage,
        progressVideo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
