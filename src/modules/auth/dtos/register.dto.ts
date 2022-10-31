import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseEntityDTO } from 'src/common/dtos/base.dto';

class RegisterDTO extends BaseEntityDTO {
  @IsNotEmpty()
  first_name: string;
}

export { RegisterDTO };
