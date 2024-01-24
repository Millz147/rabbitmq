import { Rabbit } from ".";

export const consumeMessage = async (queue: string) => {
  try {
    const connect = await Rabbit.connect();
    if (connect) {
      const { connection, channel } = connect;
      await channel.assertQueue(queue, { durable: false });
      await channel.consume(
        queue,
        async (message) => {
          if (message) {
            console.log(
              " [x] Received '%s'",
              JSON.parse(message.content.toString())
            );
          }
        },
        {
          noAck: true,
        }
      );
      //   await channel.close();
      //   await connection.close();
    }
  } catch (error) {}
};
