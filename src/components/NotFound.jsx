import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Typography variant="h5">Page not found</Typography>
      <br />
      <br />
      <Typography variant="body2">
        Taking you back in 3 seconds or click in the button below to go back
      </Typography>
      <br />
      <Button variant="outlined" onClick={() => history.push("/")}>
        Go back
      </Button>
    </div>
  );
}

export default NotFound;
