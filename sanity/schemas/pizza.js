// Everything in Sanity Studio is a react component
import { MdLocalPizza as icon } from 'react-icons/md'; // Library with 15+ icon libraries
// https://react-icons.github.io/search
import PriceInput from '../components/PriceInput';

export default {
  // Computer name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug', // slug-ify the content
      options: {
        source: 'name', // auto generated
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // When you edit images, can hotspot important pieces of images - ensures it is in the center of the photo
      },
    },
    // Add the PriceInput as an inputComponent
    // Overrides the built-in component for 'price'
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      inputComponent: PriceInput,
      validation: (Rule) => Rule.min(1000).max(5000), // Can chain rules together for data validation. Helper methods available
    },
    /* We want a one to many relationship for toppings 
      Need to establish a connection between the Toppings data
      - 
    */
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  // Custom preview of toppings on pizza
  // Extract the specific toppings
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    // Anything else we havent destructured, put into an object called toppings
    prepare: ({ title, media, ...toppings }) => {
      // 1. Filter undefined toppings out
      const tops = Object.values(toppings).filter(Boolean);
      // 2. Return the preview object for the pizza
      return {
        title,
        media,
        subtitle: tops.join(', '), // convert from an object to an array
      };
    },
  },
};
