import React, { useEffect } from "react";
import * as Action from "./actions/Actions";
import AppReducer from "./reducers/AppReducer";
import "./styles/index.scss";
import AppState from "./types/AppState";
import importScanData from "./utils/importScanData";
import Spinner from "./components/Spinner";

const initialState: AppState = {
  scans: [],
  highestPage: 0,
  page: 0,
  date: new Date(),
  manifestPath: "/scans/scan-manifest.json",
};

function App(): React.ReactElement {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  useEffect(() => {
    importScanData(state.manifestPath).then((scanData) => {
      dispatch(Action.SCANS_SRC(scanData));
    });
  }, [state.manifestPath]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChronoLog</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "400px",
          }}
        >
          {state.scans.length && (
            <p>
              {
                state.scans.reduce((closest, curr) => {
                  return Math.abs(curr.date.getTime() - state.date.getTime()) <
                    Math.abs(closest.date.getTime() - state.date.getTime())
                    ? curr
                    : closest;
                }).uid
              }
            </p>
          )}
          {state.scans.map(
            (scan) =>
              scan.pages.includes(state.page) && (
                <p key={scan.uid}>{scan.uid}</p>
              )
          )}
        </div>
        <Spinner
          value={state.page}
          onIncrease={() => {
            dispatch(Action.PAGE_ADD());
          }}
          onDecrease={() => {
            dispatch(Action.PAGE_SUB());
          }}
        />
      </header>
    </div>
  );
}

export default App;
