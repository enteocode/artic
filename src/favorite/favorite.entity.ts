import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../user/user.interface';

@Entity()
@Index(['user', 'artwork'], { unique: true })
export class Favorite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne('User', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    user: UserInterface;

    @Column({ type: 'integer', unsigned: true })
    artwork: number;
}
