import { BadRequestException, Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PagePagenationDto } from './dto/page-pagenation.dto';
import { CursorPagenationDto } from './dto/cursor-pagenation.dto';
import { captureRejectionSymbol } from 'events';

@Injectable()
export class CommonService {
  constructor() {}

  applyPagePagenationParamsToQb<T>(
    qb: SelectQueryBuilder<T>,
    dto: PagePagenationDto,
  ) {
    const { page, take } = dto;

    const skip = (page - 1) * take;

    qb.take(take);
    qb.skip(skip);
  }

  async applyCursorPagenationParamsToQb<T>(
    qb: SelectQueryBuilder<T>,
    dto: CursorPagenationDto,
  ) {
    let { cursor, order, take } = dto;

    if (cursor) {
      const decodedCursor = Buffer.from(cursor, 'base64').toString('utf-8');
      const cursorObj = JSON.parse(decodedCursor);

      // front에서 데이터가 오염될 수 있으므로 덮어 씌운다.
      order = cursorObj.order;

      const { values } = cursorObj;

      /// ! 아래와 같은 방법이 정석
      /// where (column1 > value)
      /// or (column1 = value and column2 < value2)
      /// or (column1 = value and column2 = value2 and column3 > value3)
      /// {movie.column1, movie.column2, movie.column3} = {:value1, :value2, :value3}

      const colums = Object.keys(values);
      // 정렬 방향이 모두 같다는 가정임
      const comparisonOperator = order.some((o) => o.endsWith('DESC'))
        ? '<'
        : '>';
      const whereConditions = colums.map((c) => `${qb.alias}.${c}`).join(',');
      const whereParams = colums.map((c) => `:${c}`).join(',');

      qb.where(
        `(${whereConditions}) ${comparisonOperator} (${whereParams})`,
        values,
      );
    }

    // ["likeCount_DESC","id_DESC"]
    for (let i = 0; i < order.length; i++) {
      const [column, direction] = order[i].split('_');

      if (direction !== 'ASC' && direction !== 'DESC') {
        throw new BadRequestException(
          'Order는 ASC 또는 DESC으로 입력 해주세요',
        );
      }

      if (i == 0) {
        qb.orderBy(`${qb.alias}.${column}`, direction);
      } else {
        qb.addOrderBy(`${qb.alias}.${column}`, direction);
      }
    }

    qb.take(take);

    const results = await qb.getMany();

    const nextCursor = this.generateNextCursor(results, order);

    return { qb, nextCursor };
  }

  /** cursor의 구조는 아래와 같음
   * {
   *    values : {
   *        id : 27
   *        },
   *    order : {'id_DESC'}
   * }
   * */
  generateNextCursor<T>(results: T[], order: string[]): string | null {
    const lastItem = results[results.length - 1];
    const values = {};
    console.log('fsf', results.length);

    order.forEach((columnOrder) => {
      const [column] = columnOrder.split('_');
      values[column] = lastItem[column];
    });

    const cursorObj = { values, order };
    // frontend 에서 인코딩된 string으로 관리를 하면 편함
    const nextCursot = Buffer.from(JSON.stringify(cursorObj)).toString(
      'base64',
    ); // utf-8 string을 base64로 인코딩

    return nextCursot;
  }
}
