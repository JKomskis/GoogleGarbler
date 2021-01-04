export class TranslationError extends Error {
    code?: number;

    constructor(message?: string, code?: number) {
        super(message);
        // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.name = TranslationError.name; // stack traces display correctly now

        this.code = code;
    }
}
