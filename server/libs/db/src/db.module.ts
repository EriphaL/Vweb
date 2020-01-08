import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';

// 1.把所有模块标记为全局，引用进来
const models = TypegooseModule.forFeature([
  User,Course,Episode
])
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/v-web', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    // 2.导入
    models,
  ],
  providers: [DbService],
  // 3.导出的时候声明
  exports: [DbService, models],
})
export class DbModule {}
