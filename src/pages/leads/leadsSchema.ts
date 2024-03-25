import { Schema } from 'read-excel-file';

export const leadsSchema: Schema = {
  Название: {
    prop: 'name',
    type: String,
    required: true,
  },
};
