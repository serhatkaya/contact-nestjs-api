import { Role } from '@domain/enums/role.enum';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'Users', schema: 'Authentication' })
export class UserEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 300 })
    name: string;

    @Column({ type: 'varchar', length: 30 })
    username: string;

    @Column({ type: 'varchar', length: 50 })
    password: string;

    @Column({ type: 'varchar', default: Role.Standard, readonly: false })
    role: Role;

    @Column({ type: 'boolean', default: true })
    active: boolean;
}