import { Transform, TransformOptions } from 'class-transformer';
import { EmailAddressTransformer } from './email-address.transformer';

/**
 * Transformer for DTO
 *
 * @public
 * @param options
 * @constructor
 */
export const EmailAddressTransform = (options?: TransformOptions) => {
    return Transform(({ value }) => EmailAddressTransformer.to(value), options);
};
