/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhotosLinkDto } from '../models/PhotosLinkDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns string
     * @throws ApiError
     */
    public static appControllerGetHello(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * @returns PhotosLinkDto
     * @throws ApiError
     */
    public static appControllerGetPhotosLink(): CancelablePromise<PhotosLinkDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/photoslink',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static appControllerCreatePhotosLink(
        requestBody: PhotosLinkDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/photoslink',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
