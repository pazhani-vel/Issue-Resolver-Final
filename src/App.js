import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import User_login from "./pages/User_login";
import Signup from "./pages/signup";

import "./App.css";
import Admin_login from "./pages/Admin_login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DashboardPage from "./pages/User/dashboard/DashboardPage";
import MyIssuesPage from "./pages/User/MyIssuePage/MyIssuesPage";
import ReportIssuePage from "./pages/User/ReportIssuePage/ReportIssuePage";

import NavBar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import AllIssues from "./pages/User/All_IssuePage/All_Issue";

import { withAuth } from "./components/auth";
import ProtectedRoute from "./components/ProtectedRoute.js";

function App({ authState, user }) {
  return (
    <AuthProvider>
      <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <User_login />
          </Route>
          <Route path="/login">
            <User_login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/admin_login">
            <Admin_login />
          </Route>
          <ProtectedRoute
              path="/admin"
              component={AdminDashboard}
              authState={authState}
              redirectPath="/admin_login"
            />
          <ProtectedRoute
              path="/userDashboard"
              component={DashboardPage}
              authState={authState}
              redirectPath="/login"
            />
          <Route path="/myissue">
            <MyIssuesPage />
          </Route>
          <Route path="/reportissuepage">
            <ReportIssuePage />
          </Route>
          <Route path="/allissues">
            <AllIssues/>
          </Route>
        </Switch>
      </div>
    </Router>
    </AuthProvider>
     
  );
}

export default withAuth(App);
