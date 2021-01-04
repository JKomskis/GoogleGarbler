import { html, customElement, property, TemplateResult } from 'lit-element';
import LightDomLitElement from './light-dom-lit-element';
import { ISOLangArray } from './languages';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export interface PathStepChangeEvent {
    detail: { newValue: string };
}

@customElement('language-path-step')
class LanguagePathStep extends LightDomLitElement {
    @property({ type: String })
    language = 'en';
    @property({ type: Boolean })
    first = false;
    @property({ type: Boolean })
    last = false;
    @property({ type: Boolean })
    cannotRemove = false;

    leftArrowHtml: string;
    rightArrowHtml: string;
    removeHtml: string;

    constructor() {
        super();
        library.add(faArrowRight, faTimes);

        const iconSize = 16;
        this.leftArrowHtml = icon(
            { prefix: 'fas', iconName: 'arrow-right' },
            {
                transform: {
                    size: iconSize,
                },
                classes: ['path-step__left-arrow'],
            },
        ).html[0];
        this.rightArrowHtml = icon(
            { prefix: 'fas', iconName: 'arrow-right' },
            {
                transform: {
                    size: iconSize,
                },
                classes: ['path-step__right-arrow'],
            },
        ).html[0];
        this.removeHtml = icon(
            { prefix: 'fas', iconName: 'times' },
            {
                transform: {
                    size: iconSize,
                },
                classes: ['path-step__remove'],
            },
        ).html[0];
    }

    handleChange(e: Event): void {
        const payload: PathStepChangeEvent = { detail: { newValue: (e.target as HTMLSelectElement).value || 'en' } };
        this.dispatchEvent(new CustomEvent('path-step-change', payload));
    }

    handleMoveLeft(): void {
        this.dispatchEvent(new CustomEvent('path-step-move-left'));
    }

    handleMoveRight(): void {
        this.dispatchEvent(new CustomEvent('path-step-move-right'));
    }

    handleRemove(): void {
        this.dispatchEvent(new CustomEvent('path-step-remove'));
    }

    render(): TemplateResult {
        return html`<select @change=${this.handleChange}>
                ${ISOLangArray().map(
                    (entry) =>
                        html`<option value="${entry[0]}" ?selected=${this.language === entry[0]}>${entry[1]}</option>`,
                )}
            </select>
            <div class="path-step__button-bar">
                <button
                    class="path-step__button path-step__button--first"
                    ?disabled=${this.first}
                    @click=${this.handleMoveLeft}
                >
                    ${unsafeHTML(this.leftArrowHtml)}
                </button>
                <button class="path-step__button" ?disabled=${this.cannotRemove} @click=${this.handleRemove}>
                    ${unsafeHTML(this.removeHtml)}
                </button>
                <button
                    class="path-step__button path-step__button--last"
                    ?disabled=${this.last}
                    @click=${this.handleMoveRight}
                >
                    ${unsafeHTML(this.rightArrowHtml)}
                </button>
            </div>`;
    }
}

export default LanguagePathStep;
