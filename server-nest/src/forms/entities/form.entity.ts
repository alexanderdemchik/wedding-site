import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema({ timestamps: true })
export class Form {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  confirmation: string;

  @Prop()
  email: string;

  @Prop()
  drinkPreferences: string[];

  @Prop()
  ipAddress: string;

  @Prop()
  transfer: boolean;

  @Prop()
  validated: boolean;

  @Prop()
  quantity?: number;

  @Prop()
  childsQuantity?: number;

  @Prop()
  comment?: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const FormSchema = SchemaFactory.createForClass(Form);
