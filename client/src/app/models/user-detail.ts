export interface UserDetail {
  id: string;
  name: string;
  age: number;
  phone: string;
  status: Status;
  designation: string;
}

export enum Status {
  Open = '0',
  Closed = '1',
}
