import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function AddComments({ video, setVideo }) {
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setVideo({ ...video, comments: [...video.comments, comment] });
    setComment("");
  };
  return (
    <div>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Add comment
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="comment"
        value={comment}
        label="Comment"
        name="comment"
        onChange={handleCommentChange}
      />
      <Button variant="contained" onClick={handleClick}>
        Add
      </Button>
    </div>
  );
}

export default AddComments;
