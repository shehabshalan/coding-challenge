import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function VideoCard({ video }) {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div>
          <CardMedia
            component="img"
            height="200"
            image={video.thumbnail}
            alt="alt"
          />
          <span
            style={{
              position: "relative",
              top: -30,
              left: 10,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {video.duration}
          </span>
        </div>

        <CardContent style={{ marginTop: "-10px", textAlign: "left" }}>
          <Typography gutterBottom variant="h6" component="h5">
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/video/${video.id}`}>
            <Button size="small">Watch</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default VideoCard;
