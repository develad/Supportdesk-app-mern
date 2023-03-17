import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import { PrivateRoute } from "./components/PrivateRoute";

import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            {/****************************************
              Private route
              The URL of the outlet is the same!       */}
            <Route
              path="/new-ticket"
              element={<PrivateRoute />}
            >
              <Route
                path="/new-ticket"
                element={<NewTicket />}
              />
            </Route>
            {/* ****************************************/}
            {/****************************************
              Private route
              The URL of the outlet is the same!       */}
            <Route
              path="/tickets"
              element={<PrivateRoute />}
            >
              <Route
                path="/tickets"
                element={<Tickets />}
              />
            </Route>
            {/* ****************************************/}
            {/****************************************
              Private route
              The URL of the outlet is the same!       */}
            <Route
              path="/ticket/:ticketId"
              element={<PrivateRoute />}
            >
              <Route
                path="/ticket/:ticketId"
                element={<Ticket />}
              />
            </Route>
            {/* ****************************************/}
          </Routes>
        </div>
      </Router>
      <ToastContainer
        theme="colored"
        autoClose={2000}
        transition={Flip}
        bodyStyle={{
          fontFamily: "'Kalam', cursive",
        }}
        // icon={"🔴"}
      />
    </>
  );
}

export default App;
