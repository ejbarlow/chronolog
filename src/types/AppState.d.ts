import ImageProps from "./ImageProps";

export type AppState = {
  scanData: {
    images: ImageProps[];
    highestPage: number;
  };
  page: number;
  date: Date;
};
