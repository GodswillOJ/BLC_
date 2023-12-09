const nodemailer = require('nodemailer');
require('dotenv').config()
require('../js/emailService')

user_email = process.env.user_email
emailPassword = process.env.emailPassword

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user_email,
    pass: emailPassword,
  },
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: user_email,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

