const sendAcknowledgementEmail = async ({
  firstName,
  lastName,
  email,
  date,
  time,
  phone,
}) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: process.env.SENDER_EMAIL,
          name: "The Restaurant Team",
        },
        to: [{ email: email, name: `${firstName} ${lastName}` }],
        subject: "Reservation Request Received",
        htmlContent: `
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
                      font-size: 30px;
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
                    .footer {
                      text-align: center;
                      font-size: 14px;
                      color: #777;
                      margin-top: 40px;
                      line-height: 1.4;
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
                      <img
                        src="https://raw.githubusercontent.com/nitinjha7/Restaurant-Table-Booking-System/ea0e95fb648cdf7ba566d7d9206aecd536a133aa/frontend/public/assets/logo.png"
                        alt="Restaurant Logo"
                      />
                    </div>
    
                    <!-- Header -->
                    <h1>Reservation Request Received</h1>
    
                    <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
    
                    <p>
                      Thank you for reaching out to us. We have successfully received your
                      table reservation request. Our team is currently reviewing the
                      availability for the selected date and time.
                    </p>
    
                    <!-- Reservation Details -->
                    <div class="reservation-details">
                      <p><strong>Requested Date:</strong> ${date}</p>
                      <p><strong>Requested Time:</strong> ${time}</p>
                      <p><strong>Contact Number:</strong> ${phone}</p>
                    </div>
    
                    <p>
                      If your request is approved, you will receive a separate confirmation
                      message from us.
                    </p>
    
                    <!-- Footer -->
                    <div class="footer">
                      <p>We appreciate your patience and look forward to serving you.</p>
                      <p><strong>The Restaurant Team</strong></p>
                      <small>
                        123 Food Street, Gourmet City | Tel: +123 456 7890
                      </small>
                    </div>
    
                  </div>
                </body>
              </html>
    
            `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error sending email: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error sending acknowledgement email: ", error.message);
    res.status(500).json({
      success: false,
      message: "Error occured while sending acknowledgement email",
    });
  }
};

export default sendAcknowledgementEmail;