import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { log } from "console";
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
        trans_id: Date.now(),
        trans_type: Math.random() > 0.5 ? "Зарахування" : "Списання",
        trans_amount: (Math.random() * 1000).toFixed(2),
        trans_date: new Date().toISOString(),
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
