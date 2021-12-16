import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

type SpinnerProps = {
  value: number;
  ariaLabels: {
    decrease: string;
    increase: string;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onSet: (pageNum: number) => void;
};

/**
 * Spinner component for setting a value directly or with callbacks.
 */
const Spinner: React.FC<SpinnerProps> = ({
  value,
  ariaLabels,
  onIncrease,
  onDecrease,
  onSet,
}) => {
  return (
    <div className="spinner">
      <button aria-label={ariaLabels.decrease} onClick={onDecrease}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <input
        style={{}}
        value={value}
        onChange={(e) => {
          const newVal = parseInt(e.target.value);
          onSet(isNaN(newVal) ? value : newVal);
        }}
      />
      <button aria-label={ariaLabels.increase} onClick={onIncrease}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
};

export { Spinner as default };
