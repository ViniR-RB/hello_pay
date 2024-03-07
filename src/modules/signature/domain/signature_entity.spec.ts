import { randomUUID } from 'crypto';
import { SiganatureEntity } from './signature_entity';

describe('Unit Test in Signature Entity constructor', () => {
  it('should return  a signature where its constructor does not receive an id and return me a random id', () => {
    const signatureEntity = new SiganatureEntity(74.0, '500 mega plan');
    expect(signatureEntity).toBeDefined();
    expect(signatureEntity.signatureId).toBeDefined();
    expect(signatureEntity.signatureValue).toEqual(74.0);
  });
  it('should return a signature where its constructor recive an id and return me the same id', () => {
    const id = randomUUID();
    const signatureEntity = new SiganatureEntity(74.0, '500 mega plan', id);
    expect(signatureEntity).toBeDefined();
    expect(signatureEntity.signatureId).toEqual(id);
    expect(signatureEntity.signatureValue).toEqual(74.0);
  });
});
