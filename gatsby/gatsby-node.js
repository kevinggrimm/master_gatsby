// Need to use node APIs to resolve the file
import path from 'path';
// To use Fetch within Node, you need to import this library
import fetch from 'isomorphic-fetch';

// async function turnBeersIntoPages

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  // When using node API, it is asynchronous, so need to use await
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    // console.log('Creating a page for', pizza.name);
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        kevin: 'is in gilbert',
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // console.log(`Turning the Toppings into Pages!!!!`);
  // 1. Get the template
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all the toppings
  // When using node API, it is asynchronous, so need to use await
  // NOTE: You can also destructure the error (err) and response (res)
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. Create page for that topping
  data.toppings.nodes.forEach((topping) => {
    // console.log('Creating a topping for ', topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        // TODO: Regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to pizza.js
}

// Function to fetch beers
// Once this is integrated, should be able to see other args in GraphQL for beers!
async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  console.log('Turn Beers into Nodes!');
  // 1. Fetch a list of beers
  // To use the Fetch API in a Node File, you need to use a library `isomorphic-fetch`
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // console.log(beers);
  // 2. Loop over each one
  for (const beer of beers) {
    // create a variable to store all node metadata
    // when you create a node, you need to both (1) give it the actual data (beers) as well as some metadata about the data that you are putting in
    // Need to give the node an ID -- but, this API doesnt have an ID! So you need to create a unique on in Gatsby with the helper function, `createNodeID
    // NOTE ==> Recall this is destructured in our argument parameters
    // If this were relational data (e.g., if a beer had a parent beer (or pizzas w/ toppings)), you can relate them
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        // This is going to specify our query name (in GraphQL this is allBeer / Beer)
        type: 'Beer',
        // When sourcing nodes, it could be: images, markdown, etc. Used so that other plugins looking for that type of media can find it. We arent using it, but - if you are sourcing something like Markdown and use another plugin to parse that markdown, other plugins can find the media that they are looking for with this argument
        mediaType: 'application/json',
        // Internal thing in Gatsby to know if the data has changed or not (required for each one)
        contentDigest: createContentDigest(beer),
      },
    };
    // Takes an object with the two things created ()
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
  // 3. Create a node for that beer
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. TODO: Turn each slicemaster into their own page
  // 3. Figure out how many pages there are based on how many slicemasters there are
  // and how many per page (from the environment var)
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // console.log(
  //   `There are ${data.slicemasters.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
  // );
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    // Take actions and create page
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      // Previously we grabbed a template and put it into a variable. Can also resolve here
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template when we create it
      context: {
        // Tells us how many people we should skip
        // If we are querying slicemasters and on page 2, we want to skip 4
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });

  // Create page for each slicemaster
  data.slicemasters.nodes.forEach((slicemaster) => {
    console.log(`Creating a page for ${slicemaster}`);
    actions.createPage({
      path: `/slicemasters/${slicemaster.slug.current}`,
      component: path.resolve('.src/templates/Slicemaster.js'),
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });
}

// Happens before the createPages (data needs to exist before the page is created)
export async function sourceNodes(params) {
  // Fetch a list of beers and source them into our Gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically
  // TO RUN CONCURRENTLY:
  // If we are to await above, that will pause createPages and THEN move onto the next line
  // These two awaits are not related
  // We dont have to wait for the pizzas to turn into pages (toppings can be turned into pages too)
  // Wait for all promises to be resolved before finishing this function (i.e. starting server)
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);

  // 3. Slicemasters
}
