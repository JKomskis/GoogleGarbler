import { LitElement } from "lit-element";

class LightDomLitElement extends LitElement {
    createRenderRoot() {
        return this;
    }
}

export default LightDomLitElement