import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContactGroupEntity } from './contact-group.entity';

@Entity({ name: 'Contacts' })
export class ContactEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 300 })
    name: string;

    @Column({ type: 'varchar', length: 30 })
    phoneNr: string;

    @Column({ type: 'varchar', length: 50 })
    email: string;

    @ManyToOne(() => ContactGroupEntity, (contactGroup: ContactGroupEntity) => contactGroup.contacts) public contactGroup: ContactGroupEntity;
}