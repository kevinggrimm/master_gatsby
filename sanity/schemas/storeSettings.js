import { MdStore as icon } from 'react-icons/md'; // Library with 15+ icon libraries

// Even though we are doing a one-off, it is still a repeatable content
// So you dont have to copy and paste it
// You can still create a settings page with another store w/o much effor

// We want a feature that goes directly to the single Settings file that is configured in the DB with no potential for them to make any overwrites or new Stores
export default {
  name: 'storeSettings',
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slicemaster',
      title: 'Slicemasters Currently Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices available at the shop',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
