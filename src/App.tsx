import React, { useEffect } from "react";
import AppState from "./types/AppState";
import AppReducer from "./reducers/AppReducer";
import "./styles/index.scss";
import * as Action from "./actions/Actions";

const initialState: AppState = {
  scans: [],
  highestPage: 0,
  page: 0,
  date: new Date(),
};

function App(): React.ReactElement {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  useEffect(() => {
    // create scan table
    dispatch(Action.SCANS_SRC("/scans/scan-manifest.json"));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>ChronoLog</h1>
        <p>{state.page}</p>
        <button
          type="button"
          onClick={() => {
            dispatch(Action.PAGE_SUB());
          }}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(Action.PAGE_ADD());
          }}
        >
          +
        </button>
      </header>
    </div>
  );
}

export default App;
