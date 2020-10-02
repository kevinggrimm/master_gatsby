import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'; // Sanity webpack import

function createPatchFrom(value) {
  // Run event, check if value is nothing - unset if true. Set if value is something
  // Set and unset allow us to set values or remove them completely
  // Then need to patch this to Sanity Studios
  // Only need to do this if you want to create your own custom inputs

  // Take whatever the user types into the input box
  // Set it if the value is something
  // Wrap in number --> comes in as a string
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

// Intl.NumberFormat -- built into the browser
// Formats money based upon the location
// Returns a formatter that has a method .format
const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

// Destructure props of price input
// Sanity passes props - can see them in React Dev Tools --> Components
// TIP: If a parameter is greyed out, it means that it is not being used

// We want to stick the formatted version of the price into the title
export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent} // tells Sanity this is the input where changing of value happens
      />
    </div>
  );
}

// Set the focus property of the component
// We are exposing a focus method for Sanity to run
PriceInput.focus = function () {
  this._inputElement.focus();
};
