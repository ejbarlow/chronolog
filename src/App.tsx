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
import { rgbaToHSL, hsl } from "./utils/colorUtils";

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
  const [highContrast, setHighContrast] = useState(false, "highContrast");
  const [background, setBackground] = useState([0, 0, 0, 0], "background");
  const overviewToggleRef = useRef(showOverview);

  useEffect(() => {
    overviewToggleRef.current = showOverview;
  }, [showOverview]);

  useEffect(() => {
    document.body.className = highContrast ? "high-contrast" : "";
  }, [highContrast]);

  useEffect(() => {
    const [h, s] = rgbaToHSL(background);
    const hcNode = document.querySelector(":root") as HTMLElement;
    const H = h;
    const C = (H + 180) % 360;
    const L = highContrast ? 30 : 60;
    const S = 25 + s / 8;

    const tint = hsl(H, S / 4, 90 + L / 10);

    if (hcNode && hcNode.style) {
      hcNode.style.setProperty("--base", hsl(H, S, L));
      hcNode.style.setProperty("--complement", hsl(C, S, L));
      hcNode.style.setProperty("--complement--active", hsl(C, 25 + S, L));
      hcNode.style.setProperty(
        "--complement--tint",
        hsl(C, S / 4, 90 + L / 10)
      );
      hcNode.style.setProperty("--tint", tint);
      hcNode.style.setProperty("--text--light", tint);
      hcNode.style.setProperty("--text--dark", hsl(H, S - 25, 20 + L / 10));
    }
  }, [background, highContrast]);

  /**
   * Keyboard events throttled to 300ms.
   */
  const keyHandler = throttle((e: KeyboardEvent) => {
    if (document.activeElement?.tagName.toUpperCase() === "INPUT") return;
    if (e.code.match(/^Digit\d$/)) {
      dispatch(Action.VOL_SET(parseInt(e.code[5])));
      return;
    }
    switch (e.code) {
      case "ArrowLeft":
        dispatch(Action.PAGE_SUB());
        break;
      case "ArrowRight":
        dispatch(Action.PAGE_ADD());
        break;
      case "ArrowUp":
        dispatch(Action.DATE_SUB());
        break;
      case "ArrowDown":
        dispatch(Action.DATE_ADD());
        break;
      case "KeyO":
        setShowOverview(!overviewToggleRef.current);
        break;
      case "Escape":
        setShowOverview(false);
        break;
      default:
        break;
    }
  }, 300);

  /**
   * Keyboard events throttled to 300ms.
   */
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

      <nav className={showOverview ? "show-overview" : ""}>
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
