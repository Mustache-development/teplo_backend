import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Bank {
  @Prop()
  balance: Number;

  @Prop()
  transactions: Transaction[];
}

export class Transaction {
  @Prop()
  trans_id: String;

  @Prop()
  trans_type: String;

  @Prop()
  trans_amount: String;

  @Prop()
  trans_date: String;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
