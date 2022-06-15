import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class CategoryIdArgs {
  @Field()
  @IsNotEmpty()
  
  categoryId: string;
}
