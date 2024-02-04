import { Schema, model, Model, Document, Types } from 'mongoose';

export interface IFormData {
    name: string;
    phone: string;
    confirmation: string;
    drinkPreferences: string[];
    ipAddress: string;
}

interface IFormMethods {
    toDto(): FormDto;
}

type IFormDataModel = Model<IFormData, object, IFormMethods>;

const formDataSchema = new Schema<IFormData, IFormDataModel, IFormMethods>(
    {
        name: { type: String, required: true },
        phone: String,
        confirmation: String,
        drinkPreferences: [String],
        ipAddress: String,
    },
    { timestamps: true }
);

formDataSchema.method(
    'toDto',
    function toDto(
        this: Document<unknown, {}, IFormData> &
            IFormData & {
                _id: Types.ObjectId;
            }
    ): FormDto {
        return {
            id: this._id.toString(),
            name: this.name,
            phone: this.phone,
            confirmation: this.confirmation,
            drinkPreferences: this.drinkPreferences,
            ipAddress: this.ipAddress,
        };
    }
);

export const FormData = model<IFormData, IFormDataModel>('FormData', formDataSchema);

export interface FormDto {
    id: string;
    name: string;
    phone: string;
    confirmation: string;
    drinkPreferences: string[];
    ipAddress: string;
}
