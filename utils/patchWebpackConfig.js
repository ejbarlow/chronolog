/**
 * patch();
 *
 * Simple text replace on a `webpack.config.js` inside `node_modules`. Prevents
 * hanging caused by unresolved duplicate promises.
 *
 * Retrieved from
 * https://github.com/pixelkritzel/savages/blob/master/patchWebpackConfig.js
 */

import { promises as fs } from "fs";
import log from "./log.mjs";

async function patch() {
  let webpackConfig = await fs
    .readFile("./node_modules/react-scripts/config/webpack.config.js", "utf-8")
    .catch((err) => {
      console.error(
        `\n${String.fromCodePoint(0x274c)} Error reading webpack.config.js`,
        err
      );
    });
  webpackConfig = webpackConfig.replace(
    "new ForkTsCheckerWebpackPlugin({",
    "new ForkTsCheckerWebpackPlugin({useTypescriptIncrementalApi: false,"
  );
  await fs
    .writeFile(
      "./node_modules/react-scripts/config/webpack.config.js",
      webpackConfig,
      "utf-8"
    )
    .then(() => {
      console.log();
      log(
        `${String.fromCodePoint(
          0x2705
        )} "./node_modules/react-scripts/config/webpack.config.js" patched`,
        "fgGreen"
      );
    })
    .catch((err) => {
      console.error(
        `\n${String.fromCodePoint(0x274c)} Error writing webpack.config.js`,
        err
      );
    });
}
patch();
