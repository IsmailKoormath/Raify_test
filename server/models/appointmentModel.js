import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true, unique: true },
});

export default mongoose.model("Appointment", appointmentSchema);
