import { User } from "./models/User";

const user = new User({ id: 1 });

user.set({ 'age': 9000 })
user.set({ 'name': 'adsadjak' });
user.save()

const gino = new User({ name: 'gino', age: 20 });
gino.save()