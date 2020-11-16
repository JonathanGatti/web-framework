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
}