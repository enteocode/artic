import { ValueTransformer } from 'typeorm';
import emails from 'email-addresses';

/**
 * Transformer for TypeORM entities
 *
 * @public
 */
export const EmailAddressTransformer: ValueTransformer = {
    from(value: string): string {
        return value;
    },

    to(value: string): null | string {
        if (!value) {
            return null;
        }
        const base = emails.parseOneAddress(String(value).toLowerCase());

        if (base === null) {
            return null;
        }
        if (base.type !== 'mailbox') {
            return null;
        }
        const { address, local, domain } = base;

        // Removing mailing list annotations to prevent multiple account registrations
        // with the same address

        if (local.includes('+')) {
            return `${local.replace(/\+[^@]+/, '')}@${domain}`;
        }
        return address;
    }
};
