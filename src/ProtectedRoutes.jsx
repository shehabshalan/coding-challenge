import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "@mui/material";
import { useUserAuth } from "../src/context/UserAuthContext";
function ProtectedRoutes({ component: Component, ...rest }) {
  const { user } = useUserAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user === null) {
          return <Redirect to="/login" />;
        }
        return (
          <>
            <Header />

            <Container sx={{ py: 8 }} maxWidth="lg">
              <Component />
            </Container>
          </>
        );
      }}
    />
  );
}

export default ProtectedRoutes;
