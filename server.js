const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle Dialogflow webhook requests
app.post('/webhook', (req, res) => {
  const queryResult = req.body.queryResult;

  // Extract parameters from Dialogflow request
  const studentName = queryResult.parameters.studentName;
  const cityName = queryResult.parameters.cityName;
  const phoneNumber = queryResult.parameters.PhoneNumber;
  const cnic = queryResult.parameters.CNIC;
  const email = queryResult.parameters.Email;
  const course = queryResult.parameters.Course;

  // Send email with the collected data
  sendEmail(studentName, cityName, phoneNumber, cnic, email, course)
    .then(() => {
      res.send({
        fulfillmentText: `Thank you ${studentName}, your registration for the ${course} course has been received!`
      });
    })
    .catch(error => {
      console.error(error);
      res.send({
        fulfillmenltText: 'There was an error processing your request. Please try again later.'
      });
    });
});

// Function to send email using nodemailer
const sendEmail = (studentName, cityName, phoneNumber, cnic, email, course) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kingmubashir018@gmail.com',
        pass: '@#$%HUSSAINI542@#$%'
      }
    });

    let mailOptions = {
      from: 'kingmubashir018@gmail.com',
      to: 'hammadn788@gmail.com', email,
      subject: 'Saylani Student Registration',
      html: `
        <h1>Student Registration Details</h1>
        <p><strong>Name:</strong> ${studentName}</p>
        <p><strong>City:</strong> ${cityName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>CNIC:</strong> ${cnic}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Course:</strong> ${course}</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
