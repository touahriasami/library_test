import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowsModule } from './modules/borrows/borrows.module';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryService } from './core/services/cloudinary/cloudinary.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_URL,
      }),
    }),
    AuthorsModule,
    BooksModule,
    BorrowsModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
