// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Predicate = (previous: any, next: any) => boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConditionsList = readonly any[];

export type ConditionsPredicate<Cond extends ConditionsList = ConditionsList> =
  (conditions: Cond) => boolean;

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isStrictEqual: Predicate = (previous: any, next: any): boolean =>
  previous === next;

export const truthyAndArrayPredicate: ConditionsPredicate = (
  conditions,
): boolean => conditions.every(Boolean);

export const truthyOrArrayPredicate: ConditionsPredicate = (
  conditions,
): boolean => conditions.some(Boolean);
