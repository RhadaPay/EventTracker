import { IsNumber, Min } from "class-validator";

export class CreateEventDto {
  @IsNumber()
  @Min(0)
  public eventStreamId: number;
}