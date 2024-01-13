import { ApiProperty } from "@nestjs/swagger";

export class ForgotDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  code: string;

  @ApiProperty({ required: true })
  newPassword: string;
}
