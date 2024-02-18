const custom_address = {
  properties: {
    userId: { type: 'integer' },
    name: { type: 'text' },
    memo: { type: 'text' },
    originalLandAddress: { type: 'text' },
    originalRoadAddress: { type: 'text' },
    point: { type: 'geo_point' },
  },
};

module.exports = custom_address;
