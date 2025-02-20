## 데이터베이스 마이그레이션

1. migration 파일 생성
   npx typeorm migration:generate -n <migration name>

2. migraion 실행하기
   npx typeorm migration:run

3. migration 되돌리기
   npx typeorm migration:revert
