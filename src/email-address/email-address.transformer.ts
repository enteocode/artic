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

        // Removing mailing list annotations to prevent multiple account registrations
        // with the same address

        if (base.includes('+')) {
            return base.replace(/\+[^@]+/, '');
        }
        return base;
    }
};
