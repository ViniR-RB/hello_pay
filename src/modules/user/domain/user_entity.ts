import { randomUUID } from 'crypto';
import { formatarDataParaISO8601 } from '../../../core/utils/formated_date_iso';
export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
export type UserProps = {
  name: string;
  email: string;
  password: string;
  phone?: Partial<string>;
  signatureCode?: Partial<string>;
  role?: Partial<UserRole>;
  createdAt?: Partial<string>;
  updatedAt?: Partial<string>;
  zipCode?: Partial<string>;
  state?: Partial<string>;
  city?: Partial<string>;
  address?: Partial<string>;
};

export class UserEntity {
  public readonly id: string;
  public userProps: Required<UserProps>;
  constructor(props: UserProps, id?: string) {
    this.userProps = {
      ...props,
      signatureCode: props.signatureCode || null,
      phone: props.phone || null,
      createdAt: props.createdAt || formatarDataParaISO8601(new Date()),
      updatedAt: props.updatedAt || formatarDataParaISO8601(new Date()),
      role: props.role || UserRole.User,
      zipCode: props.zipCode || null,
      state: props.state || null,
      city: props.city || null,
      address: props.address || null,
    };
    this.id = id || randomUUID();
  }

  get name() {
    return this.userProps.name;
  }
  get email() {
    return this.userProps.email;
  }
  get password() {
    return this.userProps.password;
  }
  set changePassword(newPassword: string) {
    this.userProps.password = newPassword;
  }
  get phone() {
    return this.userProps.phone;
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

  get userRole() {
    return this.userProps.role;
  }
  toJSON() {
    return {
      id: this.id,
      ...this.userProps,
    };
  }
}
