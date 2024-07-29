import { getChannel } from "./connection";
import { sendVerificationEmail } from "../services/email.service";

export async function startConsumer() {
  const channel = getChannel();

  await channel.consume("email.queue", async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());

      await sendVerificationEmail(
        data.email,
        data.verificationToken
      );

      channel.ack(msg);
    } catch (error) {
      console.error(error);

      channel.nack(msg, false, true);
    }
  });
}