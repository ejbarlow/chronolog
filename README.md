# ChronoLog

Image viewer for sequential pages of scans, with support for multiple versions of a page, each scanned on a different date.

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Scripts

### `yarn start`

Runs ChronoLog in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches Jest in the interactive watch mode.

### `yarn build`

Builds ChronoLog for production to the `build` folder.\
Optimised, minified, in production mode & ready for deployment.

### `yarn eject`

Abandon create-react-app and react-scripts for customisable config. 

## Patch
There is a patch file in `/utils/` which disables `useTypescriptIncrementalApi` for `ForkTsCheckerWebpackPlugin` in `react-scripts`.

Disabling the option prevents a bug which could cause TypeScript to hang due to unresolved duplicated promises. Details can be found [where I found the patch](https://github.com/pixelkritzel/savages/blob/master/patchWebpackConfig.js).

Run the patch from the root directory with:
```console
~$ node utils/patchWebpackConfig.js
```
