import { shape, number, string, arrayOf } from 'prop-types';

export const songType = {
  data: arrayOf(
    shape({
      id: number,
      title: string,
      artist: string,
      dateAdded: string
    }).isRequired
  ).isRequired
};

export const columnType = {
  columns: arrayOf(shape({ width: number }).isRequired).isRequired
};
