import { FormDocument } from '../entities/form.entity';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class FormDto {
  constructor(form?: FormDocument) {
    if (form) {
      this.id = form._id.toString();
      this.name = form.name;
      this.phone = form.phone;
      this.confirmation = form.confirmation;
      this.drinkPreferences = form.drinkPreferences;
      this.ipAddress = form.ipAddress;
      this.createdAt = form.createdAt;
      this.updatedAt = form.updatedAt;
      this.transfer = form.transfer;
      this.validated = form.validated;
      this.quantity = form.quantity;
      this.comment = form.comment;
      this.childsQuantity = form.childsQuantity;
    }
  }

  id?: string;

  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  confirmation: string;
  drinkPreferences?: string[];
  ipAddress?: string;
  transfer: boolean;

  @IsInt()
  @IsOptional()
  quantity?: number;

  validated?: boolean;

  comment?: string;
  childsQuantity?: number = 0;

  createdAt?: Date;
  updatedAt?: Date;
}
