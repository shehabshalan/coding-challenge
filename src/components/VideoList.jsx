import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Typography, Grid } from "@mui/material";
import VideoCard from "./VideoCard";

import DataContext from "../context/DataContext";
function VideoList() {
  const { videos } = useContext(DataContext);

  return (
    <>
      <Box>
        {!videos.length ? (
          <Typography variant="h6" align="center" gutterBottom>
            Loading ...
          </Typography>
        ) : (
          <Typography variant="h5" align="left" gutterBottom>
            Videos list
          </Typography>
        )}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          columns={12}
        >
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={video.id}>
              <VideoCard video={video} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default VideoList;
