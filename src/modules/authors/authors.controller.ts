import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ObjectId } from 'mongoose';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }
  @Put(':id/photo')
  updatePhoto(@Param('id') id: ObjectId, @Body('photo') photo: string) {
    return this.authorsService.updatePhoto(id, photo);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.authorsService.remove(id);
  }
}
