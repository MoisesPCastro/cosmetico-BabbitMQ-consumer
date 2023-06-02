import { Channel, connect } from "amqplib";
import { cosmeticoController } from "src/cosmetico/cosmetico.controller";
import { Server } from "socket.io";
import * as http from "http";

export default class CosmeticoMessageChannel {
  private _channel: Channel;
  private _CosmeticoCtrl: cosmeticoController;
  private _io: Server;

  constructor(server: http.Server) {
    this._io = new Server(server, {
      cors: {
        origin: process.env.SOCKET_CLIENT_SERVER,
        methods: ["GET", "POST"],
      },
    });

    this._io.on("connection", () => {
      console.log("Web socket connection created"),
        this._io.disconnectSockets();
    });
  }

  private async _createMessageChannel() {
    try {
      const connection = await connect(process.env.AMQP_SERVER);
      this._channel = await connection.createChannel();
      this._channel.assertQueue(process.env.QUEUE_NAME);
    } catch (err) {
      console.log("Connection to RabbitMQ failed");
      console.log(err);
    }
  }

  async consumeMessages() {
    await this._createMessageChannel();
    if (this._channel) {
      this._channel.consume(process.env.QUEUE_NAME, async (msg) => {
        const produtosObj = JSON.parse(msg.content.toString());
        console.log("Message received");
        this._channel.ack(msg);
        this._io.emit(process.env.SOCKET_EVENT_NAME, produtosObj);
        console.log("New candle emited by web socket");
      });
      console.log("Candle consumer started");
    }
  }
}
