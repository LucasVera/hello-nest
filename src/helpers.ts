import { inspect } from 'util';

const defaultInspectParams = [true, 2, true];

export function inspectObject(obj, params?: Array<any>): string {
  if (!params) params = defaultInspectParams;
  return inspect(obj, ...params);
}
