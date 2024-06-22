import { Temporal } from '@js-temporal/polyfill';

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type SignalStatus = {
  isInRange: boolean;
  color: 'red' | 'blue' | 'yellow';
  startTime: Temporal.PlainTime;
  endTime: Temporal.PlainTime;
};

export type TrafficSignal = {
  id: string;
  name: string;
  location: Coordinate;
  signalData: SignalStatus[];
};
