import { Rabbit } from ".";

export const publishMessage = async (queue: string, data: any) => {
  try {
    const connect = await Rabbit.connect();
    if (connect) {
      const { connection, channel } = connect;
      await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
      console.log(`data was sent successfully`);
      //   await channel.close();
      //   await connection.close();
    }
  } catch (error) {
    console.log("Publishing Error");
  }
};
