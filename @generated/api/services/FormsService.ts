/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormDto } from '../models/FormDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FormsService {
    /**
     * @param requestBody
     * @returns FormDto
     * @throws ApiError
     */
    public static formsControllerCreate(
        requestBody: FormDto,
    ): CancelablePromise<FormDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/forms',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns FormDto
     * @throws ApiError
     */
    public static formsControllerFindAll(): CancelablePromise<Array<FormDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/forms',
        });
    }
    /**
     * @param id
     * @returns FormDto
     * @throws ApiError
     */
    public static formsControllerFindOne(
        id: string,
    ): CancelablePromise<FormDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/forms/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns FormDto
     * @throws ApiError
     */
    public static formsControllerUpdate(
        id: string,
        requestBody: FormDto,
    ): CancelablePromise<FormDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/forms/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static formsControllerRemove(
        id: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/forms/{id}',
            path: {
                'id': id,
            },
        });
    }
}
