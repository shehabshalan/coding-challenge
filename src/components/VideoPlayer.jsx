import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ReactPlayer from "react-player";
function VideoPlayer({ videoPath }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(true);
  }, []);
  return (
    <Container maxWidth="lg">
      <ReactPlayer
        playing={isPlaying}
        controls
        url={videoPath}
        width="100%"
        height="100%"
      />
    </Container>
  );
}

export default VideoPlayer;
