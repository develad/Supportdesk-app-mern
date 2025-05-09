import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      {/* <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div> */}
      <div>{format(new Date(ticket.createdAt), "PPPPp")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link
        to={`/ticket/${ticket._id}`}
        className="btn btn-reverse btn-sm"
      >
        View
      </Link>
    </div>
  );
}

export default TicketItem;
