import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "@mui/material";
import { useUserAuth } from "../src/context/UserAuthContext";
function ProtectedRoutes({ component: Component }) {
  const { user } = useUserAuth();
  return (
    <Route
      render={() => {
        if (!user) {
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
