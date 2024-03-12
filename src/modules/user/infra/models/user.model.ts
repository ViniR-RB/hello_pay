import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SignatureModel } from '../../../signature/infra/model/signature.model';
import { UserEntity, UserRole } from '../../domain/user_entity';

@Entity({ name: 'users' })
export default class UserModel {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  phone: string;
  @ManyToOne(() => SignatureModel, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  signature?: SignatureModel;

  @Column({ type: 'varchar', length: 5, default: 'user' })
  role: UserRole;

  @Column({ nullable: true })
  zipCode?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  document?: string;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;

  toEntity(): UserEntity {
    return new UserEntity(
      {
        createdAt: this.createdAt,
        updatedAt: this.createdAt,
        name: this.name,
        phone: this.phone,
        email: this.email,
        role: this.role,
        password: this.password,
        signatureCode: this.signature.id,
        address: this.address,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        document: this.document,
      },
      this.id,
    );
  }
}
