import { response } from "express";
import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/user.js";



export const stripeWebhooks = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const session = event.data.object; // This IS the session
        const { transactionId, appId } = session.metadata;

        if (appId !== "quickgpt") {
          console.log("Ignored invalid metadata");
          break;
        }

        const transaction = await Transaction.findOne({
          _id: transactionId,
          isPaid: false,
        });

        if (!transaction) {
          console.log("Transaction already processed");
          break;
        }

        // Add credits to user
        await User.updateOne(
          { _id: transaction.userId },
          { $inc: { credits: transaction.credits } }
        );

        transaction.isPaid = true;
        await transaction.save();

        console.log(`Transaction ${transactionId} credited successfully`);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
        break;
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error", error);
    return res.status(500).send("Internal server error");
  }
};
