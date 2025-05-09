import React from "react";
import { FaTicketAlt, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link
        to="/new-ticket"
        className="btn btn-block btn-reverse"
      >
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link
        to="/tickets"
        className="btn btn-block"
      >
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  );
}

export default Home;
