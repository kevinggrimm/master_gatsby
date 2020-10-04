import { useState } from 'react';

// Pass in defaults, use state
// Make an updater function that takes in the event, then runs setValues()
// Normally we would do setName and pass the value
// But, because the form is taking an object, we need to spread the existing values into it and then update the new one

// This will then be used in order.js
export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(e) {
    // TIP - Check if it is a number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      // Copy the existing values into it
      ...values,
      // Update the new value that changed
      // cant hardcode the object property - make it dynamic
      // take the name attribute of the input; set it to the value of what the user types
      [e.target.name]: value,
    });
  }

  return { values, updateValues };
}
