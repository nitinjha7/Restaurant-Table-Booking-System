import reservation from "../models/reservationSchema.js";
import sendAcknowledgementEmail from "../utils/sendAcknowledgementEmail.js";
import sendStatusUpdateEmail from "../utils/sendStatusUpdateEmail.js";

export const sendReservation = async (req, res) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return res.status(400).json({
      success: false,
      message: "Please fill full reservation form",
    });
  }

  try {
    await reservation.create({
      firstName,
      lastName,
      email,
      date,
      time,
      phone,
    });

    res.status(200).json({
      success: true,
      message: "Reservation request sent successfully",
    });

    sendAcknowledgementEmail({ firstName, lastName, email, date, time, phone });

  } catch (error) {
    console.error("Error sending reservation email: ", error.message);
    res.status(500).json({
      success: false,
      message: "Error occured while sending reservation email",
    });
  }
};

export const getReservation = async (req, res) => {
  try {
    const data = await reservation.find({});
    // console.log("Fetched Reservations: ", data);
    res.status(201).json({
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

export const updateReservationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if(status !== 'CONFIRMED' && status !== 'REJECTED'){
    return res.status(400).json({
      success: false,
      message: "Invalid status value",
    });
  }

  try{
    const reservationData = await reservation.findById(id);

    if(!reservationData){
      return  res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if(reservationData.status !== 'PENDING'){
      return res.status(400).json({
        success: false,
        message: "Only PENDING reservations can be updated",
      });
    }

    reservationData.status = status;
    await reservationData.save();

    res.status(201).json({
      success: true,
      message: `Reservation ${status.toLowerCase()} successfully`,
    });

    sendStatusUpdateEmail({
      firstName: reservationData.firstName,
      lastName: reservationData.lastName,
      email: reservationData.email,
      date: reservationData.date,
      time: reservationData.time,
      phone: reservationData.phone,
      status: reservationData.status,
    });

    
  } 
  catch(err){
    console.error("Error updating reservation status: ", err.message);
    res.status(500).json({
      success: false,
      message: "Cannot update reservation status",
    });
  }
}
