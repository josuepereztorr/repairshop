import moment from 'moment';

const getCurrentDateFormatted = (format) => {
  const today = moment();
  return today.format(format);
};

export { getCurrentDateFormatted };
