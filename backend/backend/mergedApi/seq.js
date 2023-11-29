import { Sequelize } from "sequelize";
import mysql from "mysql2"

const sequelize = new Sequelize('tripPlanner' , 'root' , 'jk8618829@' , {
    host : 'localhost',
    dialect : 'mysql'
})

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

