import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  image: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  attendees: { type: String, required: true },
  registrationLink: { type: String, required: true },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

const eventModel =
  mongoose.models.Event || mongoose.model("Event", eventSchema);

export default eventModel;
