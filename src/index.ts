import { UserEdit } from "./views/UserEdit";
import { User } from './models/User';

const user = User.buildUser({ name: 'Gino', age: 20 });

const root = document.querySelector('#root');
if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
  console.log(userEdit)
} else {
  throw new Error('root element not found');
}
