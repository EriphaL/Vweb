import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiUseTags } from '@nestjs/swagger';
import { ReturnModelType} from '@typegoose/typegoose'

@Crud({
  model: Course
})

@Controller('courses')
@ApiUseTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
  ){ }

  @Get('option')
  option(){
    return {
      title: '课程管理',
      align: 'center',
      menuAlign: 'center',
      column: [
        {
          label: '课程名称',
          prop: 'name',
          // 加row字段让每一个占一行
          row:true
        },
        {
          label: '课程封面',
          prop: 'cover',
          type:'upload',
          listType:'picture-img',
          action:'upload',
          width:120,
        }
      ]
    }
  }
}
