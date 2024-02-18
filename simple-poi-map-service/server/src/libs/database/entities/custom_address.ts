export class CustomAddress {
  userId: number;

  name: string;

  memo: string;

  originalLandAddress: string;

  originalRoadAddress: string;

  point: {
    longitude: number;
    latitude: number;
  };
}
