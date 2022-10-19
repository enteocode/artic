import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariables } from './environment.variables';

export function validate(config: Record<string, unknown>) {
  const variables = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(variables, { skipMissingProperties: false });

  if (errors.length) {
    throw new Error(JSON.stringify(errors, null, 2));
  }
  return variables;
}
