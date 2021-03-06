import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';

// const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    MulterModule.register({
      // 表示目标文件夹在哪里 本地
      dest:'uploads'
      // 现在改成阿里云存储
      // storage: MAO({
      //   config: {
      //     region: '<region>',
      //     accessKeyId: '<accessKeyId>',
      //     accessKeySecret: '<accessKeySecret>',
      //     bucket: '<bucket>'
      //   }
      // })

    }),
    DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
