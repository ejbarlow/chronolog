import React from "react";

type ToggleProps = {
  value: boolean;
  setter: (arg0: boolean) => void;
  ariaLabel: string;
  className?: string;
};

/**
 * Button for toggling a value.
 */
const Toggle: React.FC<ToggleProps> = ({
  value,
  setter,
  ariaLabel,
  className,
  children,
}) => {
  const classes = ["toggle"];
  if (value) classes.push("active");
  if (className) classes.push(className);
  return (
    <>
      <div className={classes.join(" ")}>
        <button
          aria-label={ariaLabel}
          className="toggle-inner"
          onClick={() => {
            setter(!value);
          }}
        >
          {children}
        </button>
      </div>
    </>
  );
};

export { Toggle as default };
