import React, { FC } from "react";

type SpinnerProps = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const Spinner: FC<SpinnerProps> = ({ value, onIncrease, onDecrease }) => {
  return (
    <>
      <p>
        <span onClick={onDecrease}>(-)</span>
        {value}
        <span onClick={onIncrease}>(+)</span>
      </p>
    </>
  );
};

export { Spinner as default };
