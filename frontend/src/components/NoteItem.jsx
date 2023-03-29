import { useSelector } from "react-redux";
import { formatDateToLocal } from "../utils/utils";

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <p className="note-date">{formatDateToLocal(note.createdAt)}</p>
    </div>
  );
};

export default NoteItem;
