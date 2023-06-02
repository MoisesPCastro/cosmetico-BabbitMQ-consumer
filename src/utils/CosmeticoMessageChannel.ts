import { Channel, connect } from "amqplib";
import { Server } from "socket.io";
import * as http from "http";
import { CosmeticoService } from "../cosmetico/cosmetico.service";
import { Produtos } from "src/cosmetico/cosmetico.entity";

export default class CosmeticoMessageChannel {
  private _channel: Channel;
  private _io: Server;

  constructor(
    server: http.Server,
    private readonly cosmedicoService: CosmeticoService
  ) {
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
      try {
        this._channel.consume(process.env.QUEUE_NAME, async (msg) => {
          const produtosObj: Produtos = await JSON.parse(msg.content.toString());
          await this.cosmedicoService.save(produtosObj);
          this._channel.ack(msg);
          this._io.emit(process.env.SOCKET_EVENT_NAME, produtosObj);
        });
        console.log("Cosmedico consumer started");
      } catch (error) {
        throw new Error("Erro ao buscar msg rabbitMQ");
      }
    }
  }
}
