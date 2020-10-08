const nodemailer = require('nodemailer');

// Note -- validation should be done on the server side
// and be done before going into a database

// We arent in React, so cant use React for this
// There are frameworks to use React for email, however
// Feel free to write CSS within <style> tags
// .join('') at the end removes commas (default)
function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Call an Uber and head over - your order will be ready in 15-20 minutes</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;
}

// create a transport for nodemailer
// all authentication details needed to connect
// Normally you sign up for a "transactional email service" that sends off one-off emails
// Wes suggests Postmark (also Sendgrid etc)
// Can use https://ethereal.email for testing in dev. Create an account on the site
// Dont want to hardcode these things (using Postmark etc in production)
// Store vars in .env

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Add function to extend handler duration
// This is only for testing - dont need in prod
function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

// code the handler
// it is export.handler because it's common JS and not ES6 modules
exports.handler = async (event, context) => {
  // Can remove the await wait() afterr testing
  // await wait(5000);
  // should return the body of the statement
  // TIP -- This will display `[object Object]` within the Netlify Terminal
  // This means that your object was turned into a String without being properly stringified
  // Use JSON.parse()
  const body = JSON.parse(event.body);
  // OTHER BUG -- Cannot test netlify on localhost:8000 -- this will cause a CORS error. Test on localhost:8888

  // check if they have filled out the honeypot
  if (body.pestoSauce) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop bloop bleep blip blop later skater',
      }),
    };
  }

  // console.log(body);
  // validate the data coming in is correct
  // NOTE - typically use a forEach. But because we need to return from the async function,
  // using a forEach would create another function scope. You cannot return from an inner scope
  // of an outer scope. ==> use a for loop

  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Whoops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Order a pizza, dog`,
      }),
    };
  }

  // Tip - always use example.com if you are filling in a dummy email address
  // Example.com is actually set aside for that
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
