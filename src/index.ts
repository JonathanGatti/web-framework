import { User } from "./models/User";

const user = User.buildUser({id: 1})

user.on('save', () => {
  console.log('saved')
})

user.trigger('save');
user.fetch()
console.log(user)