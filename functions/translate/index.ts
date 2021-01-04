require('dotenv').config();

import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { AzureTranslationService } from './AzureTranslationService';
import { languageCodes } from './languages';
import { TranslationError } from './TranslationError';

const azureTranslationService = new AzureTranslationService();

function validateLanguages(sourceLanguage: string, destinationLanguage: string) {
    if (sourceLanguage === undefined) {
        throw new TranslationError('Source language is undefined.', 400);
    }
    if (!languageCodes.includes(sourceLanguage)) {
        throw new TranslationError(`Source language ${sourceLanguage} is invalid.`, 400);
    }
    if (destinationLanguage === undefined) {
        throw new TranslationError('Destination language is undefined.', 400);
    }
    if (!languageCodes.includes(destinationLanguage)) {
        throw new TranslationError(`Destination language ${destinationLanguage} is invalid.`, 400);
    }
}

function validateTextLength(text: string) {
    if (text.length > 10000) {
        throw new TranslationError('Message to translate must have no more than 10000 characters.', 400);
    }
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const sourceLanguage = req.query.from;
    const destinationLanguage = req.query.to;
    const text = req.body;

    try {
        validateLanguages(sourceLanguage, destinationLanguage);
        validateTextLength(text);

        const translatedText = await azureTranslationService.translate(sourceLanguage, destinationLanguage, text);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: translatedText,
        };
    } catch (e) {
        if (e instanceof TranslationError) {
            context.res = {
                status: e.code,
                body: e.message,
            };
        }
    }
};

export default httpTrigger;
