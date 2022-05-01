import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
function CommentsFeed({ comment }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <Typography component="span" variant="body2" color="text.primary">
              {comment}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}

export default CommentsFeed;
