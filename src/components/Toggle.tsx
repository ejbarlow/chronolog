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
}) => (
  <>
    <div className={`${className}-container`}>
      <button
        aria-label={label}
        className={`${className}${value ? ` ${className}--active` : ""}`}
        onClick={() => {
          setter(!value);
        }}
      >
        {children}
      </button>
    </div>
  </>
);

export { Toggle as default };
