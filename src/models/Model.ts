import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K]
  set(value: T): void;
  getAll(): T;
}
interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}
interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface hasId {
  id?:number
}
export class Model<T extends hasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) { }
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change')
  }
  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('cannot fetch with no id')
    }
    this.sync.fetch(id).then((res: AxiosResponse): void => (
      this.set(res.data)
    ))
  }
  save(): void {
    const data = this.attributes.getAll();
    this.sync.save(data).then((res: AxiosResponse) => {
      this.trigger('save');
    })
      .catch((e) => {
        console.log(e)
    })
  }
}