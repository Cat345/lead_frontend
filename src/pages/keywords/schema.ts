import { CustomSchema } from '../../shared/types/CustomSchema';

export const schema: CustomSchema = [
  {
    prop: 'name',
    header: 'Название',
    type: String,
    isInImport: true,
    required: true,
  },
  {
    prop: 'isActive',
    header: 'Активен',
    isInImport: false,
    required: false,
    type: Boolean,
  },
];
