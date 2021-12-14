import React from "react";
import ScanProps from "../types/ScanProps";

type VolNavProps = {
  scans: ScanProps[];
  volSetCallback: (vol: number) => void;
  currentVolume: number;
};

/**
 * Takes an array of scans and returns a group of buttons for navigating
 * between the volumes represented.
 */
const VolNav: React.FC<VolNavProps> = ({
  scans,
  volSetCallback,
  currentVolume,
}) => {
  /**
   * Given an array of scans, returns an array containing all the unique
   * volume numbers represented.
   *
   * @param scans An array containing any scans to be processed.
   * @return number[] An array containing the volume numbers of the scans.
   */
  const getVolumeNumbers = (scans: ScanProps[]): number[] => {
    return Array.from(
      new Set(
        scans.reduce((volumes: number[], scan) => {
          return [...volumes, scan.volume];
        }, [])
      )
    );
  };

  /**
   * Returns the button for a given volume.
   *
   * @param vol The volume number for the button.
   * @return JSX.Element A button for setting the current volume.
   */
  const volumeButton = (vol: number) => (
    <button
      aria-label={`Volume ${vol}`}
      className={vol === currentVolume ? "active" : ""}
      key={`btn-vol-${vol}`}
      onClick={() => volSetCallback(vol)}
    >
      {vol}
    </button>
  );

  return (
    <div className="vol-nav">
      {getVolumeNumbers(scans).map((vol) => volumeButton(vol))}
    </div>
  );
};

export { VolNav as default };
