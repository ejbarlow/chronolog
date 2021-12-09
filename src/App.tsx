import React, { useEffect, useRef } from "react";
import { useState, useReducer } from "reinspect";
import * as Action from "./actions/Actions";
import AppReducer from "./reducers/AppReducer";
import AppState from "./types/AppState";
import importScanData from "./utils/importScanData";
import Spinner from "./components/Spinner";
import PageNav from "./components/PageNav";
import ScanView from "./components/ScanView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";

import "normalize.css";
import "./styles/index.scss";
import Overview from "./components/Overview";

const initialState: AppState = {
  scans: [],
  volume: 1,
  highestPage: 0,
  page: 0,
  date: new Date(),
  manifestPath: "/scans/scan-manifest.json",
};

function App(): React.ReactElement {
  const [state, dispatch] = useReducer(
    AppReducer,
    initialState,
    (state) => state,
    "Chronolog"
  );

  const [showOverview, setShowOverview] = useState(false, "showOverview");
  const [background, setBackground] = useState("#F0F0E9", "background");
  const overviewToggleRef = useRef(showOverview);

  const keyHandler = (e: KeyboardEvent) => {
    if (document.activeElement?.tagName.toUpperCase() === "INPUT") return;
    switch (e.code) {
      case "ArrowLeft":
        dispatch(Action.PAGE_SUB());
        break;
      case "ArrowRight":
        dispatch(Action.PAGE_ADD());
        break;
      case "ArrowUp":
        dispatch(Action.DATE_ADD());
        break;
      case "ArrowDown":
        dispatch(Action.DATE_SUB());
        break;
      case "KeyO":
        setShowOverview(!overviewToggleRef.current);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    overviewToggleRef.current = showOverview;
  }, [showOverview]);

  useEffect(() => {
    importScanData(state.manifestPath).then((scanData) => {
      dispatch(Action.SCANS_SRC(scanData));
    });
  }, [state.manifestPath]);

  return (
    <div className="chronolog" style={{ backgroundColor: background }}>
      <header className="app-header">
        <h1>Chronolog</h1>
      </header>
      <main className="app-main">
        {state.scans.length &&
          (showOverview ? (
            <Overview
              scans={state.scans.filter((scan) => scan.volume === state.volume)}
              currentScan={state.currentScan}
              onScanSelect={(p) => {
                dispatch(Action.PAGE_SET(p));
                setShowOverview(false);
              }}
            />
          ) : (
            <>
              <ScanView
                currentScan={state.currentScan}
                page={state.page}
                styleCallback={setBackground}
              />
              <PageNav
                scans={state.scans.filter(
                  (scan) =>
                    scan.volume === state.volume &&
                    scan.pages.includes(state.page)
                )}
                page={state.page}
                onScanSelect={(d) => {
                  dispatch(Action.DATE_SET(d));
                }}
                currentScan={state.currentScan}
              />
            </>
          ))}
      </main>
      <nav className="app-nav">
        {!showOverview && (
          <Spinner
            className="page-nav"
            value={state.page}
            labels={{
              decrease: "Previous page",
              increase: "Next page",
            }}
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
        )}
        <div className="vol-nav">
          {Array.from(
            new Set(
              state.scans.reduce((volumes: number[], scan) => {
                return [...volumes, scan.volume];
              }, [])
            )
          ).map((vol, i) => (
            <button
              aria-label={`Volume ${i + 1}`}
              className={vol === state.volume ? "vol--active" : ""}
              key={`btn-vol-${vol}`}
              onClick={() => {
                dispatch(Action.VOL_SET(vol));
              }}
            >
              {vol}
            </button>
          ))}
        </div>
        <div className="thumb-nav-container">
          <button
            aria-label="Toggle overview"
            className={`thumb-nav${showOverview ? " thumb-nav--active" : ""}`}
            onClick={() => {
              setShowOverview(!showOverview);
            }}
          >
            <FontAwesomeIcon icon={faChessBoard} />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
