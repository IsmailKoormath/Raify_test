import express from "express";
import Appointment from "../models/appointmentModel.js";

const router = express.Router();

router.get("/slots/:date", async (req, res) => {
  const { date } = req.params;

  const allSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  const bookedSlots = await Appointment.find({ date }).select("timeSlot");
  const bookedTimes = bookedSlots.map((slot) => slot.timeSlot);

  const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

  res.json(availableSlots);
});

// Book an appointment
router.post("/book", async (req, res) => {
  const { name, phone, date, timeSlot } = req.body;

  try {
    const appointment = new Appointment({ name, phone, date, timeSlot });
    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(400).json({ error: "This time slot is already booked" });
  }
});

export default router;
