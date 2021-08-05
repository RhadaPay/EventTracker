import { IsPositive } from "class-validator";

export class PostWeiDto {
  @IsPositive()
  public value: number;
}
