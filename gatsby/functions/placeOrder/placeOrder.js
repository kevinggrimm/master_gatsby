const nodemailer = require('nodemailer');

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

// code the handler
// it is export.handler because it's common JS and not ES6 modules
exports.handler = async (event, context) => {
  // Test send an email
  // Tip - always use example.com if you are filling in a dummy email address
  // Example.com is actually set aside for that
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: 'orders@example.com',
    subject: 'New Order!',
    html: `<p>Your new pizza order is here!</p>`,
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
