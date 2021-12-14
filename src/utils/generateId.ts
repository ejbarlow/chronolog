/**
 * Returns unique IDs sequentially.
 *
 * @return string An ID string matching the pattern /^CL_\d{6}$/
 */
const generateId = () => {
  let i = 0;
  return () => {
    const index = i++;
    return `CL_${index.toString().padStart(6, "0")}`;
  };
};

const id = generateId();

export { id as default };
