/**
 * node_modules/
 */
import React, { useEffect, useRef } from "react";
import { useState, useReducer } from "reinspect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard, faAdjust } from "@fortawesome/free-solid-svg-icons";
import { throttle } from "lodash";
import "normalize.css";

/**
 * State and Type management.
 */
import * as Action from "./actions/Actions";
import AppReducer from "./reducers/AppReducer";
import AppState from "./types/AppState";

/**
 * Utils.
 */
import importScanData from "./utils/importScanData";

/**
 * Components.
 */
import {
  Overview,
  PageNav,
  ScanView,
  Spinner,
  Toggle,
  VolNav,
} from "./components";

/**
 * Styles.
 */
import "./styles/index.scss";

/**
 * Initial app state.
 */
const initialState: AppState = {
  scans: [],
  volume: 1,
  highestPage: 0,
  page: 0,
  date: new Date(),
  manifestPath: "/scans/scan-manifest.json",
};

function App(): React.ReactElement {
  // Named reducer hook to enable redux dev tools via reinspect.
  const [state, dispatch] = useReducer(
    AppReducer,
    initialState,
    (state) => state,
    "Chronolog"
  );

  /**
   * Local UI state hooks.
   */
  const [showOverview, setShowOverview] = useState(false, "showOverview");
  const [highContrast, setHighContrast] = useState(true, "highContrast");
  const [background, setBackground] = useState("#F0F0E9", "background");
  const overviewToggleRef = useRef(showOverview);

  useEffect(() => {
    overviewToggleRef.current = showOverview;
  }, [showOverview]);

  useEffect(() => {
    document.body.className = highContrast ? "high-contrast" : "";
  }, [highContrast]);

  useEffect(() => {
    document.body.style.backgroundColor = background;
  }, [background]);

  /**
   * Keyboard events throttled to 300ms.
   */
  const keyHandler = throttle((e: KeyboardEvent) => {
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
  }, 300);

  // Add listeners once on load and provide return value to clean up.
  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  /**
   * Refresh the scans when a new manifest path is provided.
   */
  useEffect(() => {
    importScanData(state.manifestPath).then((scanData) => {
      dispatch(Action.SCANS_SRC(scanData));
    });
  }, [state.manifestPath]);

  return (
    <>
      <header>
        <h1>Chronolog</h1>
        <Toggle
          className="toggle-contrast"
          value={highContrast}
          setter={(val) => {
            setHighContrast(val);
          }}
          ariaLabel="Toggle high contrast theme"
        >
          <FontAwesomeIcon icon={faAdjust} />
        </Toggle>
      </header>

      <main className={showOverview ? "show-overview" : ""}>
        {state.scans.length && (
          <>
            <Overview
              scans={state.scans.filter((scan) => scan.volume === state.volume)}
              currentScan={state.currentScan}
              onScanSelect={(p) => {
                dispatch(Action.PAGE_SET(p));
                setShowOverview(false);
              }}
            />
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
        )}
      </main>

      <nav>
        {!showOverview && (
          <Spinner
            value={state.page}
            ariaLabels={{
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
        <VolNav
          scans={state.scans}
          currentVolume={state.volume}
          volSetCallback={(vol) => {
            dispatch(Action.VOL_SET(vol));
          }}
        />
        <Toggle
          value={showOverview}
          setter={(val) => {
            setShowOverview(val);
          }}
          ariaLabel="Toggle overview"
        >
          <FontAwesomeIcon icon={faChessBoard} />
        </Toggle>
      </nav>
    </>
  );
}

export default App;
