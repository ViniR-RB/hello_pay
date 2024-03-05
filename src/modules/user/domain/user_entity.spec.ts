import { UserEntity, UserProps } from './user_entity';
describe('test UserEntity Constructor', () => {
  it('should create a new UserEntity without id', () => {
    const userEntity = new UserEntity({
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
      phone: '123456789',
      signatureCode: '21232241',
    });
    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity).toHaveProperty('id');
  });
  it('shoud create a new UserEntity with id', () => {
    const userProps: UserProps = {
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
      phone: '123456789',
      signatureCode: '21232241',
    };
    const userEntity = new UserEntity(userProps, '327163218');

    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.userProps).toEqual({ ...userProps });

    expect(userEntity).toHaveProperty('id');
    expect(userEntity.id).toEqual('327163218');
  });
  it('should create new UserEntity without signatureCode', () => {
    const userProps: UserProps = {
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
      phone: '123456789',
    };
    const userEntity = new UserEntity(userProps, '327163218');
    expect(userEntity.signatureCode).toBeNull();
  });
  it('should me return json from UserEntity', () => {
    const userProps: UserProps = {
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
      phone: '123456789',
      signatureCode: '21232241',
    };
    const userEntity = new UserEntity(userProps, '327163218');
    expect(userEntity.toJSON()).toEqual({
      id: userEntity.id,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
      name: 'John Doe',
      phone: '123456789',
      email: 'johndoe@gmail.com',
      password: '12345678',
      signatureCode: '21232241',
    });
  });
});
