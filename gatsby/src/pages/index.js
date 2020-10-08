import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>CurrentlySlicing</p>
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <p>HotSlices</p>
    </div>
  );
}

// NOTE -- You could also add inputs for your header + paragraph
// in your store settings for more flexibility
// Could also pull this data from your gatsby-config so that the data
// could live in a few other places
export default function HomePage() {
  // use the hook. when the home page renders out, it is going to run the hook once
  // that hook will then runn the sideEffect, which is a fetch request
  // we are then logging the object return from the hook
  const result = useLatestData();
  console.log(result);
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 5am to 10pm Every Day</p>
      <div>
        <CurrentlySlicing />
        <HotSlices />
      </div>
    </div>
  );
}
