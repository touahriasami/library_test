import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowsModule } from './modules/borrows/borrows.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://touariasami:bwKUftryES0SlPsa@cluster0.j3zro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      }),
    }),
    AuthorsModule,
    BooksModule,
    BorrowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
