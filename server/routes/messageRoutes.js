import express from "express";
import { protect } from "../middleware/auth.js";
import { imageMessageControllerGem, textMessageControllerGem } from "../controllers/messageController.js";

const messageRouter = express.Router()

messageRouter.post('/text', protect,textMessageControllerGem)
messageRouter.post('/image', protect,imageMessageControllerGem)

export default messageRouter
