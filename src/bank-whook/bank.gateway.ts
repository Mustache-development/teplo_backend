import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class BankGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage("bankWebHook")
  handlePost(@MessageBody() data: any): void {
    this.server.emit("bankWebHook", data);
  }
}
