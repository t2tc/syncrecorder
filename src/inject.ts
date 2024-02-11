
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { Timecode } from './timecode';

export const timeRangeKey = Symbol('timeRange') as InjectionKey<Ref<{ leftmost: Timecode, step: number }>>;
export const currentTimeKey = Symbol('currentTime') as InjectionKey<Ref<Timecode>>;