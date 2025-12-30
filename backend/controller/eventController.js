import eventModel from "../model/eventModel.js";
import transporter from "../config/nodeMailer.js"
import userModel from "../model/userModel.js";

// ...existing code...
export const createEvent = async (req, res) => {
  try {
    const {
      image,
      category,
      title,
      description,
      date,
      location,
      attendees,
      registrationLink,
      createdBy
    } = req.body;

    if (!image || !category || !title || !description || !date || !location || !attendees || !registrationLink || !createdBy) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const event = await eventModel.create({
      image,
      category,
      title,
      description,
      date,
      location,
      attendees,
      registrationLink,
      createdBy
    });

    res.status(201).json({ success: true, event });

    (async () => {
      try {
        const users = await userModel.find({}, "email");
        const allEmails = users.map((u) => u.email).filter(Boolean);
        if (allEmails.length === 0) return;

        const mailOptions = {
          from: process.env.EMAIL_SENDER,
          to: allEmails,
          subject: `New Event Created: ${title}`,
          html: `${description}` 
        };

        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error("Error sending event notification emails:", err);
      }
    })();

  } catch (error) {
    console.error("❌ Error creating event:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await eventModel.find().sort({ createdAt: -1 });
    // return consistent payload
    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};