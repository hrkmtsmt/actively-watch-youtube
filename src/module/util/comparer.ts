import * as utils from '@antfu/utils';

export class Comparer<T> {
  private _prev: T;

  private _next: T;

  constructor(value: T) {
    this._prev = value;
    this._next = value;
  }

  public get prev() {
    return this._prev;
  }

  public get next() {
    return this._next;
  }

  public isEqual() {
    return utils.isDeepEqual(this.prev, this.next);
  }

  public update(next: T) {
    this._prev = this.next;
    this._next = next;
  }
}
