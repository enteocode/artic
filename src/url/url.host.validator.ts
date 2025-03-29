import { isFQDN, isIP, registerDecorator, ValidationOptions } from 'class-validator';

export function IsHost(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            name: 'IsHost',
            options: validationOptions,
            propertyName,
            validator: {
                defaultMessage() {
                    return 'Invalid host';
                },

                validate(value: any) {
                    return isIP(value) || isFQDN(value, { require_tld: false });
                }
            }
        });
    };
}
