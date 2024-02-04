import { FormDocument } from '../entities/form.entity';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class FormDto {
  constructor(form?: FormDocument) {
    if (form) {
      this.id = form._id.toString();
      this.name = form.name;
      this.phone = form.phone;
      this.confirmation = form.confirmation;
      this.drinkPreferences = form.drinkPreferences;
      this.ipAddress = form.ipAddress;
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
}
