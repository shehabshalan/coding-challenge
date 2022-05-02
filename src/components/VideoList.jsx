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
            <VideoCard video={video} />
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default VideoList;
