module.exports = {
    HOST: "localhost",
    USER: "harishsoni",
    PASSWORD: "admin",
    DB: "harishsoni",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}