import { Schema } from 'read-excel-file';

export const stopwordsSchema: Schema = {
  Название: {
    prop: 'name',
    type: String,
    required: true,
  },
};
