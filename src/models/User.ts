import { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
} 
const url = 'http://localhost:3000/users'

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(url);
  public attributes: Attributes<UserProps>;
  constructor(attrs: UserProps) { 
    this.attributes = new Attributes<UserProps>(attrs)
  };

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }
  set(update: UserProps): void {
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