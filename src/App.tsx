import { useReducer, useRef, useState } from "react";
import "./App.css";
import { AddNoteAction, DeleteNoteAction, EditNoteAction } from "./listActions";

type ListItem = {
  id: number;
  note: string;
};

type ListState = {
  notes: ListItem[];
};

type ListAction = AddNoteAction | DeleteNoteAction | EditNoteAction;

function listReducer(state: ListState, action: ListAction) {
  const { notes } = state;

  switch (action.type) {
    case "ADD_NOTE":
      const newNoteId = notes[notes.length - 1]
        ? notes[notes.length - 1].id + 1
        : 1;
      const newNote = { id: newNoteId, note: action.payload.note };
      return {
        ...state,
        notes: [...notes, newNote],
      };

    case "DELETE_NOTE":
      const newNotes = state.notes.filter(
        (item) => item.id !== (action as DeleteNoteAction).payload.id
      );
      return { ...state, notes: newNotes };

    case "EDIT_NOTE":
      state.notes[action.payload.id - 1].note = action.payload.note;
      return state;

    default:
      return state;
  }
}

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inEditInputRef = useRef<HTMLInputElement>(null);

  const [noteInEdit, setNoteInEdit] = useState<number>(0);

  const [listState, dispatch] = useReducer(listReducer, {
    notes: [{ id: 1, note: " useReducer example usage" }],
  });

  return (
    <div>
      {/* Note add input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: "ADD_NOTE",
            payload: {
              note: inputRef.current?.value!,
            },
          });
          inputRef.current!.value = "";
        }}
      >
        <input type="text" ref={inputRef} />
        <button>Submit</button>
      </form>

      {/* List of notes  */}
      <div>
        {listState.notes.map((item) => {
          const id = item.id;
          const note = item.note;
          const thisNoteIsInEdit = noteInEdit === id;

          return (
            <div
              style={{
                display: "flex",
                gap: 2,
                height: "3rem",
                alignItems: "center",
              }}
            >
              <p>{id + ". "}</p>

              {thisNoteIsInEdit ? (
                // Edit note input
                <input
                  type="text"
                  defaultValue={note}
                  ref={inEditInputRef}
                  autoFocus
                />
              ) : (
                <p key={id + "-note"}>{note}</p>
              )}

              <button
                key={id + "-edit"}
                onClick={() => {
                  if (!thisNoteIsInEdit) {
                    setNoteInEdit(id);
                  } else {
                    dispatch({
                      type: "EDIT_NOTE",
                      payload: {
                        id: id,
                        note: inEditInputRef.current?.value!,
                      },
                    });
                    setNoteInEdit(0);
                  }
                }}
              >
                {thisNoteIsInEdit ? "Save" : "Edit"}
              </button>
              <button
                key={id + "-delete"}
                onClick={() => {
                  dispatch({ type: "DELETE_NOTE", payload: { id: id } });
                  if (id === noteInEdit) setNoteInEdit(0);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default App;
