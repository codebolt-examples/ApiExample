export interface AddVectorItemResponse {
  type: 'addVectorItemResponse';
  message: string;
}

export interface GetVectorResponse {
  type: 'getVectorResponse';
  vector: any;
}

export interface QueryVectorItemResponse {
  type: 'queryVectorItemResponse';
  item: any;
}
