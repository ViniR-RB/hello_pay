import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
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
  @Column()
  phone: string;
  @Column({ nullable: true })
  signatureCode?: string;
  @Column({ type: 'varchar', length: 5, default: 'user' })
  role: UserRole;
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
        signatureCode: this.signatureCode,
      },
      this.id,
    );
  }
}
