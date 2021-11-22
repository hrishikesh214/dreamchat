const Sequalize = require("sequelize")
const chalk = require("chalk")
const configs = require("../configs")

const sequalize = new Sequalize(
	process.env.DBNAME,
	process.env.DBUSER,
	process.env.DBPASSWORD,
	{
		dialect: "mysql",
		host: process.env.DBHOST,
		logging: !configs.log_query
			? false
			: (msg) =>
					console.log(`${chalk.yellowBright("[sequalize]")} ${msg}`),
	}
)

sequalize
	.authenticate()
	.then(
		() =>
			configs.log &&
			console.log(`${chalk.green("[log]")} Database connected...`)
	)
	.catch((e) =>
		console.log(`${chalk.red("[error]")} ${e} \n DB NOT CONNECTED`)
	)

const { DataTypes, Model } = Sequalize
const db = {}
db.sequalize = sequalize
db.Sequalize = Sequalize
db.user = require("./User")(sequalize, DataTypes, Model)
db.chat = require("./Chat")(sequalize, DataTypes, Model)
db.user_chat = require("./User_Chat")(sequalize, DataTypes, Model)
db.message = require("./Message")(sequalize, DataTypes, Model)
db.livedoc = require("./Livedoc")(sequalize, DataTypes, Model)

// User and Chat with UC
db.user.hasMany(db.user_chat, { foreignKey: "user_id", sourceKey: "id" })
db.user_chat.belongsTo(db.user, { foreignKey: "user_id", sourceKey: "id" })
db.chat.hasMany(db.user_chat, { foreignKey: "chat_id", sourceKey: "id" })
db.user_chat.belongsTo(db.chat, { foreignKey: "chat_id", sourceKey: "id" })

// User sends Messages
db.user.hasMany(db.message, { foreignKey: "sender_id", sourceKey: "id" })
db.message.belongsTo(db.user, { foreignKey: "sender_id", sourceKey: "id" })

// Chat has Messages
db.chat.hasMany(db.message, { foreignKey: "chat_id", sourceKey: "id" })
db.message.belongsTo(db.chat, { foreignKey: "chat_id", sourceKey: "id" })

db.sequalize.sync({ force: 0, alter: 1 }).then(() => {
	configs.log &&
		console.log(`${chalk.yellowBright("[sequalize]")} Database Synced...`)
})
module.exports = db
