
@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    body: string;

    @Column({ default: true })
    published: boolean;
}
