import axios, { AxiosRequestConfig } from 'axios';
import { TranslationError } from './TranslationError';
import { TranslationService } from './TranslationService';

export class AzureTranslationService implements TranslationService {
    static baseUrl = 'https://api.cognitive.microsofttranslator.com';
    static translateUrl = '/translate';

    async translate(sourceLanguage: string, destinationLanguage: string, text: string): Promise<string> {
        const options: AxiosRequestConfig = {
            method: 'POST',
            baseURL: AzureTranslationService.baseUrl,
            url: AzureTranslationService.translateUrl,
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.AZURE_SECRET_KEY,
                'content-type': 'application/json; charset=UTF-8',
            },
            params: {
                'api-version': '3.0',
                from: sourceLanguage,
                to: destinationLanguage,
            },
            data: [
                {
                    Text: text,
                },
            ],
            responseType: 'json',
        };
        try {
            const res = await axios(options);
            return res.data[0].translations[0].text;
        } catch (e) {
            console.log(e);
            throw new TranslationError('Error translating text', 500);
        }
    }
}
