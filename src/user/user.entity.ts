import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserInterface } from './user.interface';
import { IsEmail } from 'class-validator';
import { EmailAddressTransformer } from '../email-address/email-address.transformer';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', transformer: EmailAddressTransformer })
  @Index({ unique: true })
  @IsEmail({ allow_display_name: false, allow_utf8_local_part: false })
  username: string;

  @Column({ type: 'char', length: 60 })
  @Exclude()
  password: string;
}
