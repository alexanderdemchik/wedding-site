import { FormData, FormDto } from '../data/FormData';

export const create = async (formData: FormDto): Promise<FormDto> => {
    const dbFormData = await FormData.create(formData);

    return dbFormData.toDto();
};

export const update = async (id: string, formData: FormDto): Promise<FormDto> => {
    const data = await FormData.findOneAndUpdate({ _id: id }, formData);

    return data.toDto();
};

export const getAll = async (): Promise<FormDto[]> => {
    return (await FormData.find()).map((el) => el.toDto());
};

export const getById = async (id: string): Promise<FormDto> => {
    return (await FormData.findOne({ _id: id })).toDto();
};
