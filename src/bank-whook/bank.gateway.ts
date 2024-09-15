import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
export class BankGateway {
  @WebSocketServer() server: Server;

  private interval: NodeJS.Timeout;

  onModuleInit() {
    this.interval = setInterval(() => {
      const testData = {
        balance: (Math.random() * 10000).toFixed(0),
        transaction: {
          trans_id: Date.now().toString(),
          trans_type: Math.random() > 0.5 ? "Зарахування" : "Списання",
          trans_amount: (Math.random() * 1000).toFixed(0),
          trans_date: Math.floor(Date.now() / 1000),
        }
      };

      this.server.emit("bankWebHook", testData);
      console.log("emit: ", testData);
    }, 10000);
  }

  onModuleDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  @SubscribeMessage("bankWebHook")
  handlePost(@MessageBody() data: any): void {
    this.server.emit("bankWebHook", data);
  }
}
