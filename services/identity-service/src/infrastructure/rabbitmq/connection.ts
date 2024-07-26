import amqp, { Channel, ChannelModel } from "amqplib";

let connection: ChannelModel;
let channel: Channel;

export async function connectRabbitMQ() {
  connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://rabbitmq:5672"
  );

  channel = await connection.createChannel();

  console.log("Connected to RabbitMQ");

  return channel;
}

export function getRabbitMQChannel() {
  if (!channel) {
    throw new Error("RabbitMQ channel has not been initialized");
  }

  return channel;
}