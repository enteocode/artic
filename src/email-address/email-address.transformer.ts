import { ValueTransformer } from 'typeorm';

export const EmailAddressTransformer: ValueTransformer = {
    from(value: string): string {
        return value;
    },

    to(value: string): string {
        if (!value) {
            return null;
        }
        const base = value.toLowerCase();

        if (base.includes('+')) {
            return base.replace(/\+[^@]+/, '');
        }
        return base;
    }
};
