import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import DataContext from "../context/DataContext";
import ProgressBar from "./ProgressBar";
const Input = styled("input")({
  display: "none",
});
function VideoUpload() {
  const {
    video,
    thumbnail,
    setThumbail,
    handleInput,
    setCommentsAllowed,
    handleSubmit,
    handleVideoLength,
    progressImage,
    progressVideo,
  } = useContext(DataContext);

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        maxWidth: 700,
        margin: "auto",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 1,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h6" align="center" paragraph>
            Upload your video and thumbnail here
          </Typography>
          <Stack direction="column" spacing={2} justifyContent="center">
            <label htmlFor="contained-button-video">
              <Input
                accept="video/*"
                id="contained-button-video"
                type="file"
                onChange={handleVideoLength}
                name="path"
              />
              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                component="span"
              >
                Upload Video
              </Button>
            </label>

            <Typography>
              {video ? `${video.name}` : "No video selected yet"}
            </Typography>
            {progressVideo > 0 && <ProgressBar progress={progressVideo} />}

            <label htmlFor="contained-button-thumbnail">
              <Input
                accept="image/*"
                id="contained-button-thumbnail"
                name="thumbnail"
                onChange={(e) => setThumbail(e.target.files[0])}
                type="file"
              />
              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                component="span"
              >
                Thumbnail
              </Button>
            </label>
            <Typography>
              {thumbnail ? `${thumbnail.name}` : "No thumbnail selected yet"}
            </Typography>
            {progressImage > 0 && <ProgressBar progress={progressImage} />}
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="sm">
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          onChange={handleInput}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          multiline
          fullWidth
          id="description"
          label="Description"
          name="description"
          onChange={handleInput}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          multiline
          fullWidth
          id="category"
          label="Category"
          name="category"
          onChange={handleInput}
          autoFocus
        />
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="body1" align="left" paragraph>
            Allow comments
          </Typography>
          <Switch
            inputProps={{ "aria-label": "controlled" }}
            id="commentsAllowed"
            onChange={(e) => setCommentsAllowed(e.target.checked)}
          />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Container>
    </Paper>
  );
}

export default VideoUpload;
