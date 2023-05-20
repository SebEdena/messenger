import { OmitType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "common/entities";

export class CreateUserDto extends OmitType(User, ["id", "password", "rooms"]) {
    @IsString()
    password: string;
}

