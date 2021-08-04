export enum NamedEvent {
  AppDownload,
  PriceChange,
  Other
}

export interface Event {
  id: number;
  event: NamedEvent;
  createdOn: string;
}
