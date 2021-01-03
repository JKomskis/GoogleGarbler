import { html, customElement, property, TemplateResult } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import LightDomLitElement from './light-dom-lit-element';
import { PathStepChangeEvent } from './language-path-step';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LanguageCode } from './languages';
import { delay } from './util';

@customElement("language-path")
class LanguagePath extends LightDomLitElement {
    @property({ type: Array })
    languages: Array<LanguageCode>;

    @property({ type: String })
    inputText: string;

    @property({ type: String })
    outputText: string;

    @property({ type: Boolean })
    isTranslating: boolean;

    @property({ type: Boolean })
    showError: boolean;

    @property({ type: String })
    errorText: string;

    maxTranslationLength = 10000;

    rightArrowHtml: string;
    addStepHtml: string;
    spinnerHtml: string;

    apiBasePath = process.env.API_BASE_PATH;
    apiTranslatePath = '/api/translate';

    constructor() {
        super();
        this.languages = new Array<LanguageCode>("en", "es", "ru", "en");
        this.inputText = "";
        this.outputText = "";
        this.isTranslating = false;
        this.showError = false;
        this.errorText = "";

        library.add(faArrowRight, faTimes, faSpinner);

        this.rightArrowHtml = icon({ prefix: 'fas', iconName: 'arrow-right' }, {
            transform: {
                size: 32
            },
            classes: ['path__arrow']
        }).html[0];
        this.addStepHtml = icon({ prefix: 'fas', iconName: 'times' }, {
            transform: {
                size: 16
            },
            classes: ['path__add-icon']
        }).html[0];
        this.spinnerHtml = icon({ prefix: 'fas', iconName: 'spinner' }, {
            transform: {
                size: 16
            },
            classes: ['path__spinner-icon']
        }).html[0];
    }

    handleStepChange(newValue: string, idx: number) {
        this.languages = new Array<LanguageCode>(
            ...this.languages.slice(0, idx),
            newValue as LanguageCode,
            ...this.languages.slice(idx + 1)
        );
    }

    handleMoveLeft(idx: number) {
        if (idx == 0) return;
        this.languages = new Array<LanguageCode>(
            ...this.languages.slice(0, idx - 1),
            this.languages[idx],
            this.languages[idx - 1],
            ...this.languages.slice(idx + 1)
        );
    }

    handleMoveRight(idx: number) {
        if (idx == this.languages.length - 1) return;
        this.languages = new Array<LanguageCode>(
            ...this.languages.slice(0, idx),
            this.languages[idx + 1],
            this.languages[idx],
            ...this.languages.slice(idx + 2)
        );
    }

    handleRemove(idx: number) {
        if (this.languages.length <= 2) return;
        this.languages = new Array<LanguageCode>(
            ...this.languages.slice(0, idx),
            ...this.languages.slice(idx + 1)
        );
    }

    handleAddStep() {
        this.languages = new Array<LanguageCode>(
            ...this.languages.slice(0, this.languages.length + 1),
            "en"
        );
    }

    handleInputChange(e: any) {
        this.inputText = e.target.value;
    }

    renderLanguagePathSteps(): Array<TemplateResult> {
        let itemTemplates = new Array<TemplateResult>();
        for (const [idx, lang] of this.languages.entries()) {
            itemTemplates.push(
                html`<language-path-step
                        class="path-step"
                        .language=${lang}
                        ?first=${idx == 0}
                        ?last=${idx == this.languages.length - 1}
                        ?cannotRemove=${this.languages.length <= 2}
                        @path-step-change=${(e: PathStepChangeEvent) => { this.handleStepChange(e.detail.newValue, idx) }}
                        @path-step-move-left=${() => { this.handleMoveLeft(idx) }}
                        @path-step-move-right=${() => { this.handleMoveRight(idx) }}
                        @path-step-remove=${() => { this.handleRemove(idx) }}>
                    </language-path-step>
                `
            );
            if (idx !== this.languages.length - 1) {
                itemTemplates.push(html`${unsafeHTML(this.rightArrowHtml)}`);
            }
        }
        return itemTemplates;
    }

    async handleTranslate() {
        this.isTranslating = true;

        let text = this.inputText;
        const minTimeBetweenCalls = 500; //ms
        let nextSleepTime = 0;
        for (let i = 0; i < this.languages.length - 1; i += 1) {
            await delay(nextSleepTime);
            try {
                const startTime = performance.now();
                const translatedText = await this.translateText(text, this.languages[i], this.languages[i + 1]);
                const endTime = performance.now();
                nextSleepTime = minTimeBetweenCalls - (endTime - startTime);
                this.outputText = translatedText;
                text = translatedText;
            } catch (e) {
                this.errorText = e;
                this.showError = true;
                return;
            } finally {
                this.isTranslating = false;
            }
        }
    }

    async translateText(text: string, sourceLanguage: string, destinationLanguage: string): Promise<string> {
        const options: RequestInit = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'plain/text; charset=UTF-8'
            }),
            body: text
        };
        try {
            let url = new URL(this.apiTranslatePath, this.apiBasePath);
            url.search = new URLSearchParams({
                'from': sourceLanguage,
                'to': destinationLanguage
            }).toString();
            const res = await fetch(url.toString(), options);
            const resText = await res.text();

            if (!res.ok) {
                throw Error(resText);
            }

            return resText;
        } catch (e) {
            console.log(e.message);
            return Promise.reject(`Error translating text: ${e.message}`);
        }
    }

    isTranslateButtonDisabled(): boolean {
        return this.isTranslating || this.inputText.length <= 0 || this.inputText.length > this.maxTranslationLength
    }

    render() {
        return html`
            <div class="path__path-steps">
                ${this.renderLanguagePathSteps()}
                <button class="path__add-button" @click=${this.handleAddStep}>
                    ${unsafeHTML(this.addStepHtml)}
                </button>
            </div>
            
            <div class="path__io-area">
                <div class="path__input-area">
                    <div class="path__io-header">
                        <h3 class="path__io-title-text">Input Text:</h3>
                        <p>${this.inputText.length}/${this.maxTranslationLength}</p>
                    </div>
                    <textarea class="path__text-area" placeholder="Enter text to translate..." @input=${this.handleInputChange}>${this.inputText}</textarea>
                </div>
                <div class="path__output-area">
                    <div class="path__io-header">
                        <h3 class="path__io-title-text">Output Text:</h3>
                        ${this.showError ? html`
                            <message-bar class="message-bar message-bar--alert"
                                .messageType=${"alert"}
                                .message=${this.errorText}
                                @message-bar-close=${() => { this.showError = false }}>
                            </message-bar>
                        ` : html``}
                    </div>
                    <textarea readonly class="path__text-area" placeholder="Translated text will go here...">${this.outputText}</textarea>
                </div>
            </div>

            <button class="path__translate-button ${this.isTranslateButtonDisabled() ? "path__translate-button--disabled" : ""}"
                ?disabled=${this.isTranslateButtonDisabled()}
                @click=${this.handleTranslate}>
                ${this.isTranslating ? html`Translating...  ${unsafeHTML(this.spinnerHtml)}` : 'Translate'}
            </button>
        `;
    }
}

export default LanguagePath