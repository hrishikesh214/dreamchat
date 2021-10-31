const Sequalize = require("sequelize")
const chalk = require("chalk")
const sequalize_log = false

const sequalize = new Sequalize(
	process.env.DBNAME,
	process.env.DBUSER,
	process.env.DBPASSWORD,
	{
		dialect: "mysql",
		host: process.env.DBHOST,
		logging: !sequalize_log
			? false
			: (msg) =>
					console.log(`${chalk.yellowBright("[sequalize]")} ${msg}`),
	}
)

sequalize
	.authenticate()
	.then(() => console.log(`${chalk.green("[log]")} Database connected...`))
	.catch((e) => console.log(`${chalk.red("[error]")} ${e}`))

const { DataTypes, Model } = Sequalize
const db = {}
db.sequalize = sequalize
db.Sequalize = Sequalize
db.user = require("./User")(sequalize, DataTypes, Model)

db.sequalize.sync({ force: true }).then(() => {
	console.log(`${chalk.yellowBright("[sequalize]")} Database Synced...`)
})
module.exports = db
