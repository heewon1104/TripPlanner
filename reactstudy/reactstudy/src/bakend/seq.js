import { Sequelize } from "sequelize";
import mysql from "mysql2"

const sequelize = new Sequelize('tripPlanner' , 'root' , 'jk8618829@' , {
    host : 'localhost',
    dialect : 'mysql'
})

try {
    await sequelize.authenticate()
    
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

