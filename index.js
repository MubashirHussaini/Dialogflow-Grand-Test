const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { WebhookClient } = require('dialogflow-fulfillment');
const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
  res.send('Hello World!');
});

// Create a transport object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kingmubashir018@gmail.com', // Replace with your email
    pass: '@#$%HUSSAINI542@#$%'   // Replace with your email password
  }
});

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function handleForm(agent) {
    const { name, email, course } = agent.parameters; // Extract user details from the request

    // Setup email data
    const mailOptions = {
      from: 'kingmubashir018@gmail.com',          // Sender address
      to: 'hammadn788@gmail.com', email,                              // Recipient's email
      subject: 'Saylani Student Form',       // Subject line
      html: `<h1>Student Card</h1>
             <p>Name: ${name}</p>
             <p>Course: ${course}</p>
             <p>cityName: ${cityName}</p>
             <p>PhoneNumber: ${Number}</p>
             <p>CNIC: ${cnic}</p>`       // HTML body
    };

    // Send email using the transporter
    return transporter.sendMail(mailOptions)
      .then(info => agent.add('Form has been sent to your email!')) // Notify success
      .catch(error => agent.add('Failed to send form.'));           // Handle errors
  }

  // Map the intent 'collectData' to the function
  let intentMap = new Map();
  intentMap.set('collectData', handleForm);
  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
