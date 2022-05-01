import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import VideoList from "./components/VideoList";
import VideoPage from "./components/VideoPage";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import VideoUpload from "./components/VideoUpload";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoutes exact path="/" component={VideoList} />
        <ProtectedRoutes path="/video/:id" component={VideoPage} />
        <ProtectedRoutes path="/upload" component={VideoUpload} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
