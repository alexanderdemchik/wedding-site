import { Injectable } from '@nestjs/common';
import { FormDto } from './dto/form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Form } from './entities/form.entity';
import { Model } from 'mongoose';

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}

  create(createFormDto: FormDto) {
    return new this.formModel(createFormDto).save();
  }

  async findAll(): Promise<FormDto[]> {
    return (await this.formModel.find().exec()).map((el) => new FormDto(el));
  }

  async findOne(id: string) {
    return new FormDto(await this.formModel.findOne({ _id: id }).exec());
  }

  async update(id: string, updateFormDto: FormDto) {
    return new FormDto(await this.formModel.findOneAndUpdate({ _id: id }, updateFormDto).exec());
  }

  remove(id: string) {
    return this.formModel.deleteOne({ _id: id }).exec();
  }
}
