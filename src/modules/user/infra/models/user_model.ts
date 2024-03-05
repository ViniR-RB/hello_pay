import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
