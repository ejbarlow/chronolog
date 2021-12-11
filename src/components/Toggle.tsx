import React from "react";

type ToggleProps = {
  value: boolean;
  setter: (arg0: boolean) => void;
  label: string;
  className?: string;
};

const Toggle: React.FC<ToggleProps> = ({
  value,
  setter,
  label,
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
          aria-label={label}
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
