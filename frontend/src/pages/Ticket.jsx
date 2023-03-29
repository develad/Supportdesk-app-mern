import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { getNotes, reset as noteReset } from "../features/notes/noteSlice";

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets,
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes,
  );
  //   const params = useParams();
  const dispatch = useDispatch();

  //   console.log(params);
  const { ticketId } = useParams();
  //   console.log(ticketId);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId]);

  //   console.log(ticket.createdAt);

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          {/* Date Submitted: {new Date(ticket.createdAt).toLocaleString("he-IL")} */}
          Date Submitted:{" "}
          {ticket.createdAt
            ? format(new Date(ticket.createdAt), "dd.MM.yyyy | HH:mm")
            : ""}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
        />
      ))}

      {/* Show the button only if the ticket status is NOT closed*/}

      {ticket.status !== "closed" && (
        <button
          onClick={onTicketClose}
          className="btn btn-block btn-danger"
        >
          Close
        </button>
      )}
    </div>
  );
}

export default Ticket;
