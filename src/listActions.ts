export type AddNoteAction = {
  type: "ADD_NOTE";
  payload: {
    note: string;
  };
};

export type DeleteNoteAction = {
  type: "DELETE_NOTE";
  payload: {
    id: number;
  };
};

export type EditNoteAction = {
  type: "EDIT_NOTE";
  payload: {
    id: number;
    note: string;
  };
};
