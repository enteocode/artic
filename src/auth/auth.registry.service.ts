import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRegistryService {
  private readonly disabled = new Set<object>();

  register(controller: object) {
    this.disabled.add(controller);
  }

  isAuthenticationEnabled(controller: object): boolean {
    return !this.disabled.has(controller);
  }
}
