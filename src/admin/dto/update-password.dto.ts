import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto {
  @ApiProperty({ required: true })
  currentPassword: string;

  @ApiProperty({ required: true })
  newPassword: string;
}
