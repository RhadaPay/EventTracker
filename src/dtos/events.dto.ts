import { NamedEvent } from "@/interfaces/events.interface";
import { IsEnum } from "class-validator";

export class CreateEventDto {
  @IsEnum(NamedEvent)
  public event: NamedEvent;
}