import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps>{
  template(): string {
    return `
    <div>
      <h1>User Details</h1>
      <h3>Name: ${this.model.get('name')}</h3>
      <h4>Age: ${this.model.get('age')}</h4>
    </div>
    `
  }
}