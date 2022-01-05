import importScanData from "./importScanData";

const mockManifest = {
  "1": {
    "2022_01_01": [
      "JRNL_00-01_0001.webp",
      "JRNL_02-03_0001.webp",
      "JRNL_04-05_0001.webp",
      "JRNL_06-07_0001.webp",
      "JRNL_08-09_0001.webp",
      "JRNL_10-11_0001.webp",
    ],
    "2022_01_02": [
      "JRNL_04-05_0001.webp",
      "JRNL_06-07_0001.webp",
      "JRNL_10-11_0001.webp",
      "JRNL_12-13_0001.webp",
    ],
  },
  "2": {
    "2022_01_02": [
      "JRNL_00-01_0001.webp",
      "JRNL_02-03_0001.webp",
      "JRNL_04-05_0001.webp",
      "JRNL_06-07_0001.webp",
      "JRNL_08-09_0001.webp",
    ],
    "2022_01_03": [
      "JRNL_02-03_0001.webp",
      "JRNL_10-11_0001.webp",
      "JRNL_12-13_0001.webp",
    ],
  },
};

test("Creates valid scan data from manifest", () => {
  jest.spyOn(global, "fetch").mockImplementation((): Promise<any> => {
    return Promise.resolve({
      json() {
        return Promise.resolve(mockManifest);
      },
    });
  });
  importScanData("public/manifest.json").then((scanData) => {
    expect(scanData).toMatchSnapshot();
  });
});
