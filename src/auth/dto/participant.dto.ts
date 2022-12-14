import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class ParticipantDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    password: string
}