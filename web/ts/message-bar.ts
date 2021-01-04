import { html, customElement, property, TemplateResult } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import LightDomLitElement from './light-dom-lit-element';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

@customElement('message-bar')
class MessageBar extends LightDomLitElement {
    @property({ type: String })
    messageType: string;

    @property({ type: String })
    message: string;

    alertHtml: string;
    closeHtml: string;

    constructor() {
        super();
        this.messageType = 'alert';
        this.message = '';

        library.add(faExclamationTriangle, faTimes);

        this.alertHtml = icon(
            { prefix: 'fas', iconName: 'exclamation-triangle' },
            {
                transform: {
                    size: 16,
                },
                classes: ['message-bar__icon'],
            },
        ).html[0];
        this.closeHtml = icon(
            { prefix: 'fas', iconName: 'times' },
            {
                transform: {
                    size: 16,
                },
                classes: ['message-bar__close-icon'],
            },
        ).html[0];
    }

    renderIcon(): TemplateResult {
        if (this.messageType === 'alert') {
            return html`${unsafeHTML(this.alertHtml)}`;
        }
        return html``;
    }

    render(): TemplateResult {
        return html`
            ${this.renderIcon()}
            <p class="message-bar__message">${this.message}</p>
            <button
                class="message-bar__close-button"
                @click=${() => {
                    this.dispatchEvent(new CustomEvent('message-bar-close'));
                }}
            >
                ${unsafeHTML(this.closeHtml)}
            </button>
        `;
    }
}

export default MessageBar;
