// Everything in Sanity Studio is a react component
import { FaPepperHot as icon } from 'react-icons/fa'; // font-awesome library
// https://react-icons.github.io/search

export default {
  // Computer name
  name: 'topping',
  // visible title
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'What is the name of the topping?',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'What is the name of the topping?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    /* Destructure the argument into their own properties */
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? '+seedling' : ''}`,
    }),
  },
};
