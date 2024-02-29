import { Schema } from 'read-excel-file';

export const keywordsSchema: Schema = {
  Название: {
    prop: 'name',
    type: String,
    required: true,
  },
};
