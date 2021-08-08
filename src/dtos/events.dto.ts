import { IsPositive } from "class-validator";

export class CreateEventDto {
  @IsPositive()
  public eventStreamId: number;
}