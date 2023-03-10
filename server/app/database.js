const db = require("./models");

(async () => {
    try {
        await db.sequelize.authenticate();
        db.sequelize.sync();
        console.log("Database connection has been established successfully")
    } catch(error) {
        console.error("Unable to connect to the database: ", error);
    }
})();

module.exports = db;