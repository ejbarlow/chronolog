import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

type SpinnerProps = {
  value: number;
  labels: {
    decrease: string;
    increase: string;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onSet: (pageNum: number) => void;
};

const Spinner: FC<SpinnerProps> = ({
  value,
  labels,
  onIncrease,
  onDecrease,
  onSet,
}) => {
  return (
    <div className="spinner">
      <button aria-label={labels.decrease} onClick={onDecrease}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <input
        style={{}}
        value={value}
        onChange={(e) => {
          onSet(parseInt(e.target.value));
        }}
      />
      <button aria-label={labels.increase} onClick={onIncrease}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
};

export { Spinner as default };
