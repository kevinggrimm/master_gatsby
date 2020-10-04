// Package that will
// By default, Sanity will surface tokens that start with GATSBY_, but it will not surface any other tokens (tokens that are sensitive and shouldnt be in the browser... shouldnt be in the browser)
/// Do not want people to get the password to your CMS

import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
// To confirm this works, enter, console.log(process.env.SANITY_TOKEN)

// NOTE: Wes added a tweak in package.json --> scripts --> build to allow for export default instead of module.exports
// Gatsby is going to implement this. After that it will be Gatsby build
// NOTE -- You can also probably put this stuff into a sanity panel (store-specific settings)
export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The best pizza in all the land!`,
    twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    // https://www.gatsbyjs.com/plugins/gatsby-source-sanity/?=gatsby-source-sanity
    {
      // this is the name of the plugin you are adding
      // NOTE: A lot of the plugins for sourceing data are gatsby-source-SERVICE
      resolve: 'gatsby-source-sanity',
      options: {
        // Need the project ID in sanity
        // Go to manage.sanity.io --> find project
        projectId: 'oiadrili',
        // dataset that we want to work with
        dataset: 'production',
        // when you're in development + make a change to Sanity CMS, it will automatically be updated in your Gatsby
        // Get real-time editing experience when in development mode
        watchMode: true,
        // Token for Sanity
        // Settings --> API --> Add new token --> Read
        // We are not writing data to our sanity - that is what Sanity Studio is for
        // Note -- you dont want to put sensitive information into your Gatsby config
        // This file DOES go into your version control (checked into Git)
        // We are going to make a .env file in our ROOT
        token: process.env.SANITY_TOKEN,
        // NOTE: You have to add a CORS origin that if you are accessing straight from the browserr
        // Do not need for localhost:8000 because the browswer will not be talking directly to Sanity
        // The browser happens at build time on the node server -- in this case, CORS does not apply
        // We WILL be doing this in prod (images for example are pulled live at build time)
      },
    },
  ],
};

// NOTE: You need to restart your process after adding this file
// In the running gatsby terminal, hit Ctrl + C, then `npm start`
// When it starts, it looks for gatsby-connfig.js
// Any settings in there will be applied to the build

// GraphQL will build the query for you -- it is a "typed" language (has Intellisense)
// We are going to do the same thing w/ Sanity Studio
// Will not be manually typing -- we are going to install a plugin to source that
