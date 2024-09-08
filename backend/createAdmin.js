require('dotenv').config();
const connectDB = require('./db');
const { Employee } = require('./models');

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);

    const existingAdmin = await Employee.findOne({
      email: process.env.DEFAULT_ADMIN_USER_EMAIL,
    });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const adminUser = new Employee({
      firstName: 'Admin',
      lastName: 'User',
      email: process.env.DEFAULT_ADMIN_USER_EMAIL,
      password: process.env.DEFAULT_ADMIN_USER_PASSWORD,
      userRole: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully.');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
