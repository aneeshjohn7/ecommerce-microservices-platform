import amqp from "amqplib";
import process = require("process");

let channel: amqp.Channel;

export async function connectRabbitMQ() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL!
  );

  channel = await connection.createChannel();

  return channel;
}

export function getChannel() {
  return channel;
}