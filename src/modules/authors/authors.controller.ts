import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({
    summary: 'create new author',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('photo'))
  @Post('authors')
  create(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.authorsService.create(createAuthorDto, photo);
  }

  @ApiOperation({
    summary: 'get all author',
  })
  @Get('authors')
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({
    summary: 'update author data by providing _id',
  })
  @ApiParam({
    name: 'id',
  })
  @Put('authors/:id')
  update(@Param('id') id: ObjectId, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({
    summary: 'update author photo by providing _id',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('photo'))
  @Put('authors/:id/photo')
  updatePhoto(
    @Param('id') id: ObjectId,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.authorsService.updatePhoto(id, photo);
  }

  @ApiOperation({
    summary: 'delete author by providing _id',
  })
  @ApiParam({
    name: 'id',
  })
  @Delete('authors/:id')
  remove(@Param('id') id: ObjectId) {
    return this.authorsService.remove(id);
  }

  @ApiOperation({
    summary: 'get top authors',
  })
  @Get('top-authors')
  topAuthors() {
    return this.authorsService.topAuthors();
  }
}
