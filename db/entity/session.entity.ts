import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SessionSettings } from './session-settings.entity';

@Entity({
    name: 'Sessions'
})
export class Session {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'nvarchar'
    })
    title: string;

    @Column({
        type: 'nvarchar',
        nullable: true
    })
    description?: string;

    @OneToOne(type => SessionSettings, sessionSettings => sessionSettings.session)
    settings: SessionSettings;
}