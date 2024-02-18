// 마이그레이션을 자동화 하는 방법에 대해서 조금 더 고민을 해보자
const address = require('./address.create.mapping');
const custom_address = require('./custom_address.create.mapping');

module.exports = {
  address,
  custom_address,
};
