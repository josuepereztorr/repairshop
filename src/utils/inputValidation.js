const maxCharAllowable = (maxNumOfChar) => {
  return (val) =>
    val.length <= maxNumOfChar ||
    `Please use a maximum of ${maxNumOfChar} characters`;
};

const required = () => {
  return (val) => (val && val.length > 0) || 'Required';
};

const numberRange = (first, last) => {
  return (val) =>
    (val >= first && val <= last) ||
    `Value must be between ${first} to ${last}`;
};

export { maxCharAllowable, required, numberRange };
