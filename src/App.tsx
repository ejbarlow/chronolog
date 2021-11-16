import React, { useEffect, useReducer, useState } from "react";
import * as Action from "./actions/Actions";
import AppReducer from "./reducers/AppReducer";
import AppState from "./types/AppState";
import importScanData from "./utils/importScanData";
import Spinner from "./components/Spinner";
import PageNav from "./components/PageNav";
import ScanView from "./components/ScanView";

import "normalize.css";
import "./styles/index.scss";
import ScanProps from "./types/ScanProps";
import Overview from "./components/Overview";

const initialState: AppState = {
  scans: [],
  highestPage: 0,
  page: 0,
  date: new Date(),
  manifestPath: "/scans/scan-manifest.json",
};

function App(): React.ReactElement {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [showOverview, setShowOverview] = useState(false);
  const [currentScan, setCurrentScan] = useState<ScanProps | undefined>(
    undefined
  );
  const findScan = () => {
    setCurrentScan(
      state.scans
        .filter((scan) => scan.pages.includes(state.page))
        .reduce((closest, curr) => {
          return Math.abs(curr.date.getTime() - state.date.getTime()) <
            Math.abs(closest.date.getTime() - state.date.getTime()) &&
            curr.pages.includes(state.page)
            ? curr
            : closest;
        })
    );
  };

  useEffect(() => {
    importScanData(state.manifestPath).then((scanData) => {
      dispatch(Action.SCANS_SRC(scanData));
    });
  }, [state.manifestPath]);

  useEffect(() => {
    if (state.scans.length) {
      findScan();
    }
  }, [state.date, state.scans, state.page]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Title</h1>
        <button
          onClick={() => {
            setShowOverview(!showOverview);
          }}
        >
          Thumbnails
        </button>
      </header>
      <main className="app-main">
        {state.scans.length &&
          (showOverview ? (
            <Overview
              scans={state.scans}
              onScanSelect={(p) => {
                dispatch(Action.PAGE_SET(p));
                setShowOverview(false);
              }}
            />
          ) : (
            <ScanView scans={state.scans} page={state.page} date={state.date} />
          ))}
      </main>
      <nav className="app-nav">
        <PageNav
          scans={state.scans}
          page={state.page}
          onScanSelect={(d) => {
            dispatch(Action.DATE_SET(d));
          }}
          currentScan={currentScan}
        />
        <Spinner
          className="page-nav"
          value={state.page}
          onIncrease={() => {
            dispatch(Action.PAGE_ADD());
          }}
          onDecrease={() => {
            dispatch(Action.PAGE_SUB());
          }}
          onSet={(p) => {
            dispatch(Action.PAGE_SET(p));
          }}
        />
      </nav>
    </div>
  );
}

export default App;
