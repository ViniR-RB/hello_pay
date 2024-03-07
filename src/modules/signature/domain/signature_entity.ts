import { randomUUID } from 'crypto';

export class SiganatureEntity {
  constructor(
    private value: Required<number>,
    private readonly description: Required<string>,
    private readonly id?: Partial<string>,
  ) {
    this.value = value;
    this.description = description;
    this.id = this.id || randomUUID();
  }

  get signatureValue(): number {
    return this.value;
  }
  get signatureId(): string {
    return this.id;
  }

  get signatureDescription(): string {
    return this.description;
  }
}
