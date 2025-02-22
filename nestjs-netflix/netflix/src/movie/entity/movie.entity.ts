import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTable } from '../../common/entity/base_table.entity';
import { MovieDetail } from './movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { Transform } from 'class-transformer';
import { User } from 'src/user/entity/user.entity';

/// ManyToOne Director -> 감독은 여러 개의 영화를 만들 수 있음
/// OneToOne MovieDetail -> 영화는 하나의 상세 내용을 갖을 수 있음
/// ManyToMany Genre -> 영화는 여러개의 장르를 갖을 수 있고 장르는 여러개의 영화에 속할 수 있음

@Entity()
export class Movie extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.createdMovies)
  creator: User;

  @Column({
    unique: true,
  })
  title: string;

  @OneToOne(() => MovieDetail, (movieDetail) => movieDetail.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  detail: MovieDetail;

  @Column()
  @Transform(({ value }) => `http://localhost:3000/${value}`)
  movieFilePath: string;

  @ManyToOne(() => Director, (director) => director.id, {
    cascade: true,
    nullable: false,
  })
  director: Director;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable()
  genres: Genre[];

  @Column({
    default: 0,
  })
  likeCount: number;
}

// export class Movie extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   genre: string;
// 아래와 같이 nesting을 할 수 있지만 base안의 객체로 출력된다.
//   @Column(
//      ()=>BaseEntity
//   )
//   base: BaseEntity
// }

// 아래와 같이 실긍 테이블 상속?도 가능함
// @Entity()
// @TableInheritance({
//   column: {
//     type: 'varchar',
//     name: 'type',
//   },
// })
// export class Content extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   genre: string;
// }

// @ChildEntity()
// export class Movie extends Content {
//   @Column()
//   runtime: number;
// }

// @ChildEntity()
// export class Serise extends Content {
//   @Column()
//   seriseCount: number;
// }
