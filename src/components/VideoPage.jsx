import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import CommentsFeed from "./CommentsFeed";
import { Container, Paper, Typography, Grid } from "@mui/material";
// import Switch from "@mui/material/Switch";
import AddComments from "./AddComments";
import VideoCard from "./VideoCard";
import DataContext from "../context/DataContext";

function VideoPage() {
  const { id } = useParams();
  const { videos } = useContext(DataContext);
  const [video, setVideo] = useState({});
  const getRelatedVideos = (allVideos) => {
    const relatedVideos = allVideos.filter((v) => {
      return v.category === video.category;
    });
    return relatedVideos;
  };

  useEffect(() => {
    const videoById = videos.find((video) => video.id === id);
    setVideo(videoById);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
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
                Comments
              </Typography>
              {video.commentsAllowed ? (
                <Paper>
                  {video.comments?.map((comment) => (
                    <CommentsFeed comment={comment} />
                  ))}
                </Paper>
              ) : (
                <i>Comments are off</i>
              )}

              {video.commentsAllowed ? (
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
                {getRelatedVideos(videos).map((video) => (
                  <VideoCard video={video} />
                ))}
              </Grid>
            </Container>
          </>
        </>
      )}

      {!video && (
        <Typography variant="h6" align="center">
          No video found
        </Typography>
      )}
    </div>
  );
}

export default VideoPage;
