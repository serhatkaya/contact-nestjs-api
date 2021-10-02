import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: false, nullable: true })
    isDeleted?: boolean;

    @Column({ type: 'varchar', length: 300, nullable: true })
    deletedBy?: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    createdDateTime?: Date;

    @Column({ type: 'varchar', length: 300, nullable: true })
    createdBy?: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updatedDateTime?: Date;

    @Column({ type: 'varchar', length: 300, nullable: true })
    updatedBy?: string;
}