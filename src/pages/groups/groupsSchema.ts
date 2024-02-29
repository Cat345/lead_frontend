import { Schema } from 'read-excel-file';

export const groupsSchema: Schema = {
  Название: {
    prop: 'name',
    required: true,
    type: String,
  },
  Username: {
    prop: 'username',
    required: true,
    type: String,
  },
};
