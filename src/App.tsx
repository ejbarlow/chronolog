import path from "path";
import React, { useEffect } from "react";
import * as Action from "./actions/Actions";
import AppReducer from "./reducers/AppReducer";
import "./styles/index.scss";
import AppState from "./types/AppState";
import ScanProps from "./types/ScanProps";
import id from "./utils/generateId";

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
    async function fetchManifest() {
      const response = await fetch(state.manifestPath);
      const data = await response.json();
      const scanRoot = path.dirname(state.manifestPath);
      const scans: ScanProps[] = [];
      for (const date in data) {
        for (const scan in data[date]) {
          const fileStr = data[date][scan];
          const dirStr = `${scanRoot}/${date}`;
          const [y, m, d] = date.split("_").map((num: string) => parseInt(num));
          const dateProp = new Date(y, m - 1, d);
          const [, pagesStr] = fileStr.split("_");
          const pages = pagesStr.split("-").map((num: string) => parseInt(num));
          scans.push({
            uid: id(),
            path: `${dirStr}/${fileStr}`,
            pages,
            date: dateProp,
            version: 0,
          });
        }
      }
      const highestPage: number = scans.reduce((pNum, { pages }) => {
        return pages[pages.length - 1] > pNum ? pages[pages.length - 1] : pNum;
      }, 0);
      // make the object here, pass as the payload
      dispatch(Action.SCANS_SRC({ scans, highestPage }));
    }
    fetchManifest();
  }, [state.manifestPath]);

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
