const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
    origin: 'https://four7.in', // Replace with your front-end domain for better security.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/notify', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rahuyltheroy47@gmail.com', // Replace with your email
            pass: 'your-email-password' // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'rahuyltheroy47@gmail.com', // Replace with your email
        to: 'rahul@four7.in',
        subject: 'New Notification Subscription',
        text: `New subscriber: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ message: 'Failed to send email', error });
        }
        res.send({ message: 'Email sent successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
