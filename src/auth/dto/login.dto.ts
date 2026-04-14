import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // <-- Importante para Swagger

export class LoginDto {
  @ApiProperty({ example: 'secretaria', description: 'El nombre de usuario' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'mypassword123', description: 'La contraseña en texto plano' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}