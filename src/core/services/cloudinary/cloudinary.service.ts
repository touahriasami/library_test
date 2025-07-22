import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

import * as streamifier from 'streamifier';

import * as sharp from 'sharp';

@Injectable()
export class CloudinaryService {
  private async optimizeImage(file: Express.Multer.File): Promise<Buffer> {
    return sharp(file.buffer)
      .resize({
        width: 200,
        height: 200,
        withoutEnlargement: true,
      })
      .webp({ quality: 90 })
      .toBuffer();
  }

  uploadPhoto(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      const optimizedImageBuffer = await this.optimizeImage(file);

      const uploadStream = cloudinary.uploader.upload_stream(
        async (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) return reject(error);
          resolve(result);

          //   const user = await this.usersRepository.findOne({
          //     where: {
          //       id: userId,
          //     },
          //     relations: {
          //       profile: true,
          //     },
          //   });

          //   const profile = user.profile;

          //   Object.assign(profile, { image: result.secure_url });

          //   this.profileRepository.save(profile);
        },
      );

      streamifier.createReadStream(optimizedImageBuffer).pipe(uploadStream);
    });
  }
}
