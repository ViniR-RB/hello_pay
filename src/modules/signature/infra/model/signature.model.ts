import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SiganatureEntity } from '../../domain/signature_entity';

@Entity({ name: 'signatures' })
export class SignatureModel {
  @PrimaryColumn()
  id: string;
  @Column({ type: 'decimal', precision: 7, scale: 2 })
  value: number;
  @Column()
  description: string;
  toEntity(): SiganatureEntity {
    return new SiganatureEntity(this.value, this.description, this.id);
  }
}
