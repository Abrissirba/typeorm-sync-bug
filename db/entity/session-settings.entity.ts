import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Session } from './session.entity';


@Entity({
    name: 'SessionSettings'
})
export class SessionSettings  {

    @PrimaryColumn()
    id?: number;
    
    @OneToOne(type => Session, session => session.id)
    @JoinColumn({ name: 'id', referencedColumnName: 'id' })
    session?: Session; 

}