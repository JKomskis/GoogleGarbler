export interface TranslationService {
    translate(sourceLanguage: string, destinationLanguage: string, text: string): Promise<string>;
}
