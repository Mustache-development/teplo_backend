import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";
import { BankService } from '../bank/bank.service';

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
export class BankGateway {
  @WebSocketServer() server: Server;
  private interval: NodeJS.Timeout;
  constructor(private readonly bankService: BankService) {}

  onModuleInit() {
    this.interval = setInterval(async () => {
      try {
        const statement = await this.bankService.getStatement();
        
        if (statement.code === 400) {
          console.error('Error fetching statement:', statement.message);
          return;
        }

        // Форматуємо всі транзакції
        const formattedTransactions = statement.map(transaction => ({
          balance: transaction.trans_amount.toString(),
          transaction: {
            trans_id: Date.now().toString(),
            trans_type: transaction.amount > 0 ? "Зарахування" : "Списання",
            trans_amount: Math.abs(transaction.amount).toString(),
            trans_date: Math.floor(Date.now() / 1000),
          }
        }));

        // Відправляємо всі транзакції по черзі з інтервалом 10 секунд
        formattedTransactions.forEach((transaction, index) => {
          setTimeout(() => {
            this.server.emit("bankWebHook", transaction);
            console.log("Emitting transaction:", transaction);
          }, index * 10000); // 10 секунд * порядковий номер транзакції
        });
      } catch (error) {
        console.error('Error in bank gateway:', error);
      }
    }, 10000); // Запускаємо новий цикл кожні 10 секунд
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
