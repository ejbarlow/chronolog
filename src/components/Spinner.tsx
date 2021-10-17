import React, { FC } from "react";

type SpinnerProps = {
  className: string | undefined;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onSet: (pageNum: number) => void;
};

const Spinner: FC<SpinnerProps> = ({
  className,
  value,
  onIncrease,
  onDecrease,
  onSet,
}) => {
  return (
    <div className={`spinner ${className}`}>
      <button onClick={onDecrease}>←</button>
      <form style={{}}>
        <input
          style={{}}
          value={value}
          onChange={(e) => {
            onSet(parseInt(e.target.value));
          }}
        />
      </form>
      <button onClick={onIncrease}>→</button>
    </div>
  );
};

export { Spinner as default };
