export interface IMetSystem {
  name: string;
  interval: number;
  intervals: ITimeInterval[];
}

export interface ITimeInterval {
  time: string;
  value: number;
}

export interface IColumns {
  columnDef: string;
  header: string;
  custom?: boolean;
  sticky?: boolean;
}
