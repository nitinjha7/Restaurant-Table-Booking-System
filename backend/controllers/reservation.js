const reservation = require("../models/reservationSchema");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return res.status(400).json({
      success: false,
      message: "Please fill full reservation form",
    });
  }

  try {
    await reservation.create({ firstName, lastName, email, date, time, phone });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reservation Confirmation",
        html: `
            <html>
            <head>
                <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f7f6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 650px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #2d5d6f;
                    text-align: center;
                    font-size: 32px;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555;
                }
                .logo {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .logo img {
                    width: 150px;
                    height: auto;
                }
                .reservation-details {
                    background-color: #f9fafb;
                    padding: 20px;
                    margin-top: 20px;
                    border-radius: 8px;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
                }
                .reservation-details p {
                    margin: 10px 0;
                    font-size: 16px;
                    color: #444;
                }
                .button {
                    display: inline-block;
                    background-color: #2d5d6f;
                    color: #ffffff;
                    padding: 12px 25px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                    text-align: center;
                    margin-top: 30px;
                }
                .footer {
                    text-align: center;
                    font-size: 14px;
                    color: #777;
                    margin-top: 40px;
                    line-height: 1.4;
                }
                .footer a {
                    color: #2d5d6f;
                    text-decoration: none;
                }
                .footer a:hover {
                    text-decoration: underline;
                }
                .footer small {
                    display: block;
                    margin-top: 10px;
                    font-size: 12px;
                    color: #aaa;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <!-- Logo -->
                <div class="logo">
                    <img src="https://i.ibb.co/1K710c8/logo.png" alt="logo" border="0" />
                </div>

                <!-- Reservation Header -->
                <h1>Reservation Confirmed!</h1>
                <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
                <p>Thank you for choosing our restaurant. We are delighted to confirm your reservation. Below are the details of your reservation:</p>

                <!-- Reservation Details -->
                <div class="reservation-details">
                    <p><strong>Reservation Date:</strong> ${date}</p>
                    <p><strong>Reservation Time:</strong> ${time}</p>
                    <p><strong>Contact Number:</strong> ${phone}</p>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <p>If you have any questions, feel free to <a href="mailto:${process.env.EMAIL_USER}">contact us</a>.</p>
                    <p>We look forward to serving you!</p>
                    <p><strong>The Restaurant Team</strong></p>
                    <small>123 Food Street, Gourmet City | Tel: +123 456 7890 | Email: ${process.env.EMAIL_USER}</small>
                </div>
                </div>
            </body>
            </html>
        `,
      });
    } catch (err) {
      console.log("Error in sending email: ", err.message);
    }

    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
    
  } catch (error) {
    console.log("Error occured ", error.message);
    res.status(500).json({
      success: false,
      message: "Error occured while saving reservation",
    });
  }
};

const getReservation = async (req, res) => {
  try {
    const data = await reservation.find({});
    console.log("Fetched Reservations: ", data);
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.error("Error fetching reservations: ", err.message);
    res.status(500).json({
      success: false,
      message: "Cannot get reservation data",
    });
  }
};

module.exports = { sendReservation, getReservation };
