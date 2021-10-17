import React, { useEffect } from "react";
import * as Action from "./actions/Actions";
import AppReducer from "./reducers/AppReducer";
import AppState from "./types/AppState";
import importScanData from "./utils/importScanData";
import Spinner from "./components/Spinner";

import "normalize.css";
import "./styles/index.scss";

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
    <div className="app">
      <header className="app-header">
        <h1>Title</h1>
      </header>
      <main>
        {state.scans.length && (
          <img
            className="scan-main"
            src={
              state.scans.reduce((closest, curr) => {
                return Math.abs(curr.date.getTime() - state.date.getTime()) <
                  Math.abs(closest.date.getTime() - state.date.getTime())
                  ? curr
                  : closest;
              }).path
            }
          />
        )}
      </main>
      <nav>
        <div className="scan-nav">
          {state.scans.map(
            (scan) =>
              scan.pages.includes(state.page) && (
                <div
                  key={`${scan.uid}_thumb`}
                  className="scan-thumbnail"
                  style={{ backgroundImage: `url(${scan.path})` }}
                ></div>
              )
          )}
        </div>
        <Spinner
          className="pageNav"
          value={state.page}
          onIncrease={() => {
            dispatch(Action.PAGE_ADD());
          }}
          onDecrease={() => {
            dispatch(Action.PAGE_SUB());
          }}
          onSet={(pageNum: number) => {
            dispatch(Action.PAGE_SET(pageNum));
          }}
        />
      </nav>
    </div>
  );
}

export default App;
