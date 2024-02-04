import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './entities/form.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]), ConfigModule],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
