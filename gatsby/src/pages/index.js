import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemaster On</span>
      </h2>
      <p>Ready to Slice - It - Up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>No one is working</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices On</span>
      </h2>
      <p>Come on down and grab a slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Rats we have no more pizzas</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

// NOTE -- You could also add inputs for your header + paragraph
// in your store settings for more flexibility
// Could also pull this data from your gatsby-config so that the data
// could live in a few other places

// destructure the result into slicemasters + hotSlices
export default function HomePage() {
  // use the hook. when the home page renders out, it is going to run the hook once
  // that hook will then runn the sideEffect, which is a fetch request
  // we are then logging the object return from the hook
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 5am to 10pm Every Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
