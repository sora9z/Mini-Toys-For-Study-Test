import { CreateMovieDto } from './create-movie.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// custom decorator는 아래와 같이 클래스와 함수를 사용할 수 있다.
// @ValidatorConstraint({
//   async: true, // 비동기로 할 수 있다. 데이터베이스를 사용해서 확인을 하는 등의 작업이 필요할 때.
// })
// class PasswordValidator implements ValidatorConstraintInterface {
//   validate(
//     value: any,
//     validationArguments?: ValidationArguments,
//   ): Promise<boolean> | boolean {
//     return value.length > 4 && value.length < 8;
//   }
//   defaultMessage?(validationArguments?: ValidationArguments): string {
//     return '비밀번호의 길이는 4~8자 여야합니다. 입력된 비밀번호 : ($value)';
//   }
// }

// function IsPasswordValid(validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     return registerDecorator({
//       target: object.constructor,
//       propertyName,
//       options: validationOptions, // 여기까지는 디폴트로 넣어주는 것들
//       validator: PasswordValidator,
//     });
//   };
// }
