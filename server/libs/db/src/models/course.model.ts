import { prop, modelOptions, arrayProp,Ref } from '@typegoose/typegoose'
import { ApiModelProperty } from '@nestjs/swagger'
import { Episode } from './episode.model'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Course {
  @ApiModelProperty({ description: '课程名称'})
  @prop()
  name: string

  @ApiModelProperty({ description: '封面' })
  @prop()
  cover: string

  // 一个课程里面对应多个课时，所以用复数
  @arrayProp({itemsRef:'Episode'})
  episodes:Ref<Episode>[]
}