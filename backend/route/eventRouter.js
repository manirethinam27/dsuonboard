import express from "express";
import { createEvent, getEvents } from "../controller/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/create", createEvent);
eventRouter.get("/", getEvents);

export default eventRouter;
