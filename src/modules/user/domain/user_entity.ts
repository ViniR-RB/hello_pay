import { randomUUID } from 'crypto';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  phone: string;
  signatureCode?: string;
  createdAt: string;
  updatedAt: string;
};

export class UserEntity {
  public readonly id: string;
  public userProps: Required<UserProps>;
  constructor(props: UserProps, id?: string) {
    this.userProps = {
      ...props,
      signatureCode: props.signatureCode || null,
    };
    this.id = id || randomUUID();
  }

  get name() {
    return this.userProps.name;
  }
  get phone() {
    return this.phone;
  }
  get signatureCode() {
    return this.userProps.signatureCode;
  }

  get createdAt() {
    return this.userProps.createdAt;
  }
  get updatedAt() {
    return this.userProps.updatedAt;
  }
  toJSON() {
    return {
      id: this.id,
      ...this.userProps,
    };
  }
}
