import amqp from "amqplib";

export class Rabbit {
  static connect = async () => {
    try {
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();
      return { connection, channel };
    } catch (error) {
      console.log("Connection Error.!!!");
    }
  };
}
