import { useReducer } from "react";

import "./App.css";

type Action = { type: string; value?: number };

function reducer(state: number, action: Action) {
  if (action.type === "add") {
    return state + 1;
  }
  throw state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      {state}
      <button onClick={() => dispatch({ type: "add" })}>Action</button>
    </div>
  );
}

export default App;
