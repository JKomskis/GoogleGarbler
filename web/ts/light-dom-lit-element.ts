import { LitElement } from 'lit-element';

class LightDomLitElement extends LitElement {
    createRenderRoot(): this {
        return this;
    }
}

export default LightDomLitElement;
