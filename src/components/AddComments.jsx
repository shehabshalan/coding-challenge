import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function AddComments({ video, setVideo }) {
  const [comment, setComment] = useState("");
  const [disable, setDisable] = useState(true);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setDisable(e.target.value.length < 1);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setVideo({ ...video, comments: [...video.comments, comment] });
    setComment("");
    setDisable(true);
  };
  return (
    <div>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Add comment
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="comment"
        value={comment}
        label="Comment"
        name="comment"
        onChange={handleCommentChange}
      />
      <Button variant="contained" onClick={handleClick} disabled={disable}>
        Add
      </Button>
    </div>
  );
}

export default AddComments;
