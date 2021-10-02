import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContactEntity } from './contact.entity';

@Entity({ name: 'ContactGroups' })
export class ContactGroupEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 300 })
    name: string;

    @OneToMany(() => ContactEntity, (ce: ContactEntity) => ce.contactGroup) public contacts: Array<ContactEntity>;
}