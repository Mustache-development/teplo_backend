import { PartialType } from '@nestjs/mapped-types';
import { CreateBankWhookDto } from './create-bank-whook.dto';

export class UpdateBankWhookDto extends PartialType(CreateBankWhookDto) {}
