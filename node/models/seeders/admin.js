const login = require('../login');
const signup = require('../signup');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);
const { passwordHash } = require('../../modules/passwordHashing');

connect(
  'mongodb+srv://bincyjacob:bincyjacob@cluster0.q6nbp9s.mongodb.net/patient_management',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

(async () => {
  try {
    let { salt, password } = await passwordHash('Admin@123');

    const adminSeed = {
      name: 'Admin123',
      email: 'admin@gmail.com',
      password,
      role: 'Admin',
      phoneNumber: '+91 8848265617',
      salt,
    };

    const existingDoc = await login.findOne({ email: adminSeed.email });
    if (!existingDoc) {
      const loginData = await login.create({
        email: adminSeed.email,
        password: adminSeed.password,
        salt: adminSeed.salt,
      });

      const signupData = await signup.create({
        name: adminSeed.name,
        role: adminSeed.role,
        phoneNumber: adminSeed.phoneNumber,
        loginId: loginData.id,
      });

      console.log(`Admin created successfully`);
    } else {
      console.log(`Data already exists`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
})();
