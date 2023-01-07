const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully")
    } catch(error) {
        console.error("Unable to connect to the database: ", error);
    }
})();