import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from 'nestjs-typegoose';
import { ApiUseTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Episode } from '@libs/db/models/episode.model'

@Crud({
  model: Episode
})

@Controller('episodes')
@ApiUseTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>
  ) { }

  @Get('option')
  option() {
    return {
      title: '课时管理',
      align: 'center',
      menuAlign: 'center',
      column: [
        {
          label: '课时名称',
          prop: 'name',
          sortable:true,
          search:true,
          regex:true
        },
        {
          label: '课时文件',
          prop: 'file'
        }
      ]
    }
  }
}
