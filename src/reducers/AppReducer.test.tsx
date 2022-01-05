import AppReducer from "./AppReducer";
import * as Action from "../actions/Actions";
import AppState from "../types/AppState";

/**
 * Initial app state.
 */
const mockInitialState: AppState = {
  scans: [],
  volume: 1,
  highestPage: 10,
  page: 0,
  date: new Date("Wed Jan 05 2022 19:16:33 GMT+0000 (Greenwich Mean Time)"),
  manifestPath: "/scans/scan-manifest.json",
};

const mockScans = [
  {
    uid: "CL_000000",
    path: "public/1/2022_01_01/JRNL_00-01_0001.webp",
    thumbPath: "public/1/2022_01_01/JRNL_00-01_0001_thumb.webp",
    volume: 1,
    pages: [0, 1],
    date: new Date("2022-01-01T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000001",
    path: "public/1/2022_01_01/JRNL_02-03_0001.webp",
    thumbPath: "public/1/2022_01_01/JRNL_02-03_0001_thumb.webp",
    volume: 1,
    pages: [2, 3],
    date: new Date("2022-01-01T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000002",
    path: "public/1/2022_01_01/JRNL_04-05_0001.webp",
    thumbPath: "public/1/2022_01_01/JRNL_04-05_0001_thumb.webp",
    volume: 1,
    pages: [4, 5],
    date: new Date("2022-01-01T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000003",
    path: "public/1/2022_01_01/JRNL_06-07_0001.webp",
    thumbPath: "public/1/2022_01_01/JRNL_06-07_0001_thumb.webp",
    volume: 1,
    pages: [6, 7],
    date: new Date("2022-01-01T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000004",
    path: "public/1/2022_01_01/JRNL_08-09_0001.webp",
    thumbPath: "public/1/2022_01_01/JRNL_08-09_0001_thumb.webp",
    volume: 1,
    pages: [8, 9],
    date: new Date("2022-01-01T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000005",
    path: "public/1/2022_01_01/JRNL_10-11_0001.webp",
    thumbPath: "public/1/2022_01_01/JRNL_10-11_0001_thumb.webp",
    volume: 1,
    pages: [10, 11],
    date: new Date("2022-01-01T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000006",
    path: "public/1/2022_01_02/JRNL_04-05_0001.webp",
    thumbPath: "public/1/2022_01_02/JRNL_04-05_0001_thumb.webp",
    volume: 1,
    pages: [4, 5],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000007",
    path: "public/1/2022_01_02/JRNL_06-07_0001.webp",
    thumbPath: "public/1/2022_01_02/JRNL_06-07_0001_thumb.webp",
    volume: 1,
    pages: [6, 7],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000008",
    path: "public/1/2022_01_02/JRNL_10-11_0001.webp",
    thumbPath: "public/1/2022_01_02/JRNL_10-11_0001_thumb.webp",
    volume: 1,
    pages: [10, 11],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000009",
    path: "public/1/2022_01_02/JRNL_12-13_0001.webp",
    thumbPath: "public/1/2022_01_02/JRNL_12-13_0001_thumb.webp",
    volume: 1,
    pages: [12, 13],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000010",
    path: "public/2/2022_01_02/JRNL_00-01_0001.webp",
    thumbPath: "public/2/2022_01_02/JRNL_00-01_0001_thumb.webp",
    volume: 2,
    pages: [0, 1],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000011",
    path: "public/2/2022_01_02/JRNL_02-03_0001.webp",
    thumbPath: "public/2/2022_01_02/JRNL_02-03_0001_thumb.webp",
    volume: 2,
    pages: [2, 3],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000012",
    path: "public/2/2022_01_02/JRNL_04-05_0001.webp",
    thumbPath: "public/2/2022_01_02/JRNL_04-05_0001_thumb.webp",
    volume: 2,
    pages: [4, 5],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000013",
    path: "public/2/2022_01_02/JRNL_06-07_0001.webp",
    thumbPath: "public/2/2022_01_02/JRNL_06-07_0001_thumb.webp",
    volume: 2,
    pages: [6, 7],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000014",
    path: "public/2/2022_01_02/JRNL_08-09_0001.webp",
    thumbPath: "public/2/2022_01_02/JRNL_08-09_0001_thumb.webp",
    volume: 2,
    pages: [8, 9],
    date: new Date("2022-01-02T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000015",
    path: "public/2/2022_01_03/JRNL_02-03_0001.webp",
    thumbPath: "public/2/2022_01_03/JRNL_02-03_0001_thumb.webp",
    volume: 2,
    pages: [2, 3],
    date: new Date("2022-01-03T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000016",
    path: "public/2/2022_01_03/JRNL_10-11_0001.webp",
    thumbPath: "public/2/2022_01_03/JRNL_10-11_0001_thumb.webp",
    volume: 2,
    pages: [10, 11],
    date: new Date("2022-01-03T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000017",
    path: "public/2/2022_01_03/JRNL_12-13_0001.webp",
    thumbPath: "public/2/2022_01_03/JRNL_12-13_0001_thumb.webp",
    volume: 2,
    pages: [12, 13],
    date: new Date("2022-01-03T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000018",
    path: "public/1/2021_12_30/JRNL_00-01_0001.webp",
    thumbPath: "public/1/2021_12_30/JRNL_00-01_0001_thumb.webp",
    volume: 1,
    pages: [0, 1],
    date: new Date("2021-12-30T00:00:00.000Z"),
    version: 0,
  },
  {
    uid: "CL_000019",
    path: "public/1/2022_02_01/JRNL_00-01_0001.webp",
    thumbPath: "public/1/2022_02_01/JRNL_00-01_0001_thumb.webp",
    volume: 1,
    pages: [0, 1],
    date: new Date("2022-02-01T00:00:00.000Z"),
    version: 0,
  },
];

const mockState: AppState = {
  scans: mockScans,
  volume: 1,
  highestPage: 13,
  page: 0,
  date: new Date("2022-01-01T00:00:00.000Z"),
  currentScan: mockScans[0],
  manifestPath: "/scans/scan-manifest.json",
};

describe("Page set action", () => {
  test("Sets a valid page number", () => {
    expect(AppReducer(mockInitialState, Action.PAGE_SET(5))).toEqual({
      ...mockInitialState,
      page: 5,
    });
  });

  test("Rejects a negative page number", () => {
    expect(AppReducer(mockInitialState, Action.PAGE_SET(-1))).toEqual(
      mockInitialState
    );
  });

  test("Limits to the highest available page number", () => {
    expect(AppReducer(mockInitialState, Action.PAGE_SET(15))).toEqual({
      ...mockInitialState,
      page: 10,
    });
  });
});

describe("Sequential page nav actions", () => {
  test("Increment page by 2 for double page spread", () => {
    expect(AppReducer(mockInitialState, Action.PAGE_ADD())).toEqual({
      ...mockInitialState,
      page: 2,
    });
  });

  test("Decrement page by 2 for double page spread", () => {
    expect(
      AppReducer(
        {
          ...mockInitialState,
          page: 2,
        },
        Action.PAGE_SUB()
      )
    ).toEqual({
      ...mockInitialState,
      page: 0,
    });
  });

  test("Limit page number decrement to 0", () => {
    expect(AppReducer(mockInitialState, Action.PAGE_SUB())).toEqual(
      mockInitialState
    );
  });

  test("Limit page number increment to highest value", () => {
    expect(
      AppReducer(
        {
          ...mockInitialState,
          page: 10,
        },
        Action.PAGE_ADD()
      )
    ).toEqual({
      ...mockInitialState,
      page: 10,
    });
  });
});

describe("Volume set action", () => {
  test("Sets volume if there are valid scans", () => {
    expect(AppReducer(mockState, Action.VOL_SET(2))).toEqual({
      ...mockState,
      volume: 2,
      currentScan: mockScans[10],
    });
  });

  test("Doesn't set volume if there are no valid scans", () => {
    expect(AppReducer(mockState, Action.VOL_SET(3))).toEqual(mockState);
  });
});

describe("Date set action", () => {
  test("Updates the date and gets the closest scan", () => {
    expect(
      AppReducer(mockState, Action.DATE_SET(new Date("2021-12-29")))
    ).toEqual({
      ...mockState,
      date: new Date("2021-12-29"),
      currentScan: mockScans[18],
    });
  });
});

describe("Sequential date nav action", () => {
  test("Returns unmutated state if currentScan is missing", () => {
    expect(AppReducer(mockInitialState, Action.DATE_SUB())).toEqual(
      mockInitialState
    );
  });
  test("Finds the next scan and updates the date", () => {
    expect(
      AppReducer(
        {
          ...mockState,
          date: new Date("2021-12-29"),
          currentScan: mockScans[18],
        },
        Action.DATE_ADD()
      )
    ).toEqual({ ...mockState, date: mockScans[0].date });
  });
  test("Finds the previous scan and updates the date", () => {
    expect(AppReducer(mockState, Action.DATE_SUB())).toEqual({
      ...mockState,
      date: mockScans[18].date,
      currentScan: mockScans[18],
    });
  });
});

describe("Scan sourcing action", () => {
  test("Sets relevant state values when scan data is imported", () => {
    expect(
      AppReducer(mockInitialState, Action.SCANS_SRC(mockScans))
    ).toMatchSnapshot();
  });
});

describe("Manifest path update action", () => {
  const newPath = "./public/new_manifest.json";
  test("Updates the path to the manifest", () => {
    expect(AppReducer(mockInitialState, Action.MANIFEST_SRC(newPath))).toEqual({
      ...mockInitialState,
      manifestPath: newPath,
    });
  });
});

describe("Unknown actions", () => {
  test("Return unmutated state", () => {
    expect(AppReducer(mockState, { type: "XXXX" })).toEqual(mockState);
  });
});
