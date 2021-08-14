/* Patch react-scripts' webpack.config.js
 * Prevents hanging due to duplicated promise
 * https://github.com/pixelkritzel/savages/blob/master/patchWebpackConfig.js */

import { promises as fs } from "fs";

import log from "./log.mjs";

async function patch() {
  let webpackConfig = await fs.readFile(
    "./node_modules/react-scripts/config/webpack.config.js",
    "utf-8"
  );
  webpackConfig = webpackConfig.replace(
    "new ForkTsCheckerWebpackPlugin({",
    "new ForkTsCheckerWebpackPlugin({useTypescriptIncrementalApi: false,"
  );
  await fs.writeFile(
    "./node_modules/react-scripts/config/webpack.config.js",
    webpackConfig,
    "utf-8"
  );
  console.log();
  log(
    `${String.fromCodePoint(
      0x2705
    )} "./node_modules/react-scripts/config/webpack.config.js" patched`,
    "fgGreen"
  );
}
patch();
