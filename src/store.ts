import { writable } from 'svelte/store';
import type { TrafficSignal } from '@/types';
import { Temporal } from '@js-temporal/polyfill';

export const time = writable<Temporal.PlainTime>(Temporal.PlainTime.from('00:00:00'));
export const selectedTS = writable<TrafficSignal>();
export const trafficSignals = writable<TrafficSignal[]>([]);
export const currentLocation = writable<GeolocationPosition>();
