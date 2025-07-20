import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/modules/books/schemas/book.schema';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type BorrowDocument = HydratedDocument<Borrow>;

@Schema()
export class Borrow {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Prop({ required: true })
  person: string;

  @Prop({ required: true })
  borrowAt: Date;

  @Prop()
  returnAt: Date;
}

export const BorrowSchema = SchemaFactory.createForClass(Borrow);
