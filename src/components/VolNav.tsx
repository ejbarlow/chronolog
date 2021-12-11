import React from "react";
import ScanProps from "../types/ScanProps";

type VolNavProps = {
  scans: ScanProps[];
  volSetCallback: (vol: number) => void;
  currentVolume: number;
};

const VolNav = ({
  scans,
  volSetCallback,
  currentVolume,
}: VolNavProps): React.ReactElement => (
  <div className="vol-nav">
    {Array.from(
      new Set(
        scans.reduce((volumes: number[], scan) => {
          return [...volumes, scan.volume];
        }, [])
      )
    ).map((vol, i) => (
      <button
        aria-label={`Volume ${i + 1}`}
        className={vol === currentVolume ? "vol--active" : ""}
        key={`btn-vol-${vol}`}
        onClick={() => volSetCallback(vol)}
      >
        {vol}
      </button>
    ))}
  </div>
);

export { VolNav as default };
