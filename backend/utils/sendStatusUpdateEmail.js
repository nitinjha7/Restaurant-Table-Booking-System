const sendStatusUpdateEmail = async ({ firstName, lastName, email, date, time, phone, status }) => { 
    const isConfirmed = status === 'CONFIRMED';
    try{
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
            htmlContent:`
                <html>
                    <head>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f7f6;
                        margin: 0;
                        padding: 0;
                        color: #333;
                        }
                        .container {
                        max-width: 650px;
                        margin: 0 auto;
                        background: #ffffff;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        }
                        .logo {
                        text-align: center;
                        margin-bottom: 20px;
                        }
                        .logo img {
                        width: 140px;
                        }
                        h1 {
                        text-align: center;
                        color: ${isConfirmed ? "#2e7d32" : "#c62828"};
                        font-size: 28px;
                        }
                        p {
                        font-size: 16px;
                        line-height: 1.6;
                        color: #555;
                        }
                        .status-box {
                        margin-top: 25px;
                        padding: 20px;
                        border-radius: 8px;
                        background-color: ${isConfirmed ? "#e8f5e9" : "#fdecea"};
                        border-left: 6px solid ${isConfirmed ? "#2e7d32" : "#c62828"};
                        }
                        .status-box p {
                        margin: 8px 0;
                        font-size: 16px;
                        color: #333;
                        }
                        .footer {
                        text-align: center;
                        margin-top: 40px;
                        font-size: 14px;
                        color: #777;
                        }
                        .footer small {
                        display: block;
                        margin-top: 8px;
                        font-size: 12px;
                        color: #aaa;
                        }
                    </style>
                    </head>

                    <body>
                    <div class="container">

                        <div class="logo">
                        <img src="https://raw.githubusercontent.com/nitinjha7/Restaurant-Table-Booking-System/ea0e95fb648cdf7ba566d7d9206aecd536a133aa/frontend/public/assets/logo.png" />
                        </div>

                        <h1>
                        Reservation ${isConfirmed ? "Confirmed" : "Rejected"}
                        </h1>

                        <p>Dear <strong>${firstName} ${lastName}</strong>,</p>

                        <p>
                        ${
                            isConfirmed
                            ? "We’re happy to inform you that your table reservation has been confirmed."
                            : "Thank you for your reservation request. Unfortunately, we are unable to accommodate your request at this time."
                        }
                        </p>

                        <div class="status-box">
                        <p><strong>Date:</strong> ${date}</p>
                        <p><strong>Time:</strong> ${time}</p>
                        <p><strong>Contact:</strong> ${phone}</p>
                        <p><strong>Status:</strong> ${status}</p>
                        </div>

                        <p>
                        ${
                            isConfirmed
                            ? "We look forward to welcoming you and providing you with a great dining experience."
                            : "You’re welcome to try booking another date or time, and we’ll be happy to assist you."
                        }
                        </p>

                        <div class="footer">
                        <p><strong>The Restaurant Team</strong></p>
                        <small>
                            123 Food Street, Gourmet City | Tel: +123 456 7890
                        </small>
                        </div>

                    </div>
                    </body>
                </html>
            `
        }),
      });
      if(!response.ok){
        throw new Error(`Failed to send email: ${response.statusText}`);
      }
    }catch(error){
      console.error("Error sending status update email: ", error.message);
    }
};

export default sendStatusUpdateEmail;