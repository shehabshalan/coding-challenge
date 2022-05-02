import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import CommentsFeed from "./CommentsFeed";
import { Container, Paper, Typography, Grid } from "@mui/material";
import Switch from "@mui/material/Switch";
import AddComments from "./AddComments";
import VideoCard from "./VideoCard";
import DataContext from "../context/DataContext";
import getRelatedVideos from "../helper/getRelatedVideos";
function VideoPage() {
  const { id } = useParams();
  const { videos } = useContext(DataContext);
  const [video, setVideo] = useState({});
  const [toggleComments, setToggleComments] = React.useState(true);
  const handleChange = (event) => {
    setToggleComments(event.target.checked);
  };
  useEffect(() => {
    const videoById = videos.find((video) => video.id === id);
    setVideo(videoById);
  }, [id, videos]);
  return (
    <div>
      {video && (
        <>
          <Typography variant="h6" align="center">
            {video.title}
          </Typography>
          <>
            <VideoPlayer videoPath={video.path} />
            <Container maxWidth="lg">
              <Typography variant="h6" sx={{ mt: 4 }}>
                Toggle comments
              </Typography>

              <Switch
                checked={toggleComments}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />

              <Typography variant="h6" sx={{ mt: 4 }}>
                Comments
              </Typography>
              {toggleComments ? (
                <Paper>
                  {video.comments?.map((comment) => (
                    <CommentsFeed comment={comment} />
                  ))}
                </Paper>
              ) : (
                <h6>Comments are off</h6>
              )}

              {toggleComments ? (
                <AddComments video={video} setVideo={setVideo} />
              ) : null}

              <Typography variant="h6" sx={{ mt: 4 }}>
                Related Videos
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                columns={12}
              >
                {getRelatedVideos(videos, video).map((video) => (
                  <VideoCard video={video} />
                ))}
              </Grid>
            </Container>
          </>
        </>
      )}

      {!video && (
        <Typography variant="h6" align="center">
          Loading ...
        </Typography>
      )}
    </div>
  );
}

export default VideoPage;
