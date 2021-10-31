const crypto = require("crypto")

module.exports = (sequelize, DataTypes, Model) => {
	class User extends Model {
		setPassword(password) {
			this.hash = crypto.randomBytes(16).toString("hex")
			this.password = crypto
				.pbkdf2Sync(password, this.hash, 10, 64, `sha512`)
				.toString(`hex`)
		}
		checkPassword(password) {
			var hash = crypto
				.pbkdf2Sync(password, this.hash, 10, 64, `sha512`)
				.toString(`hex`)
			return this.hash === hash
		}
	}

	User.init(
		{
			id: {
				type: DataTypes.STRING(10),
				primaryKey: true,
				comment: "U123456",
			},
			username: {
				type: DataTypes.STRING(30),
				comment: "unique username",
			},
			hash: {
				type: DataTypes.STRING,
				comment: "unique hash for password",
			},
			password: {
				type: DataTypes.STRING,
			},
			name: {
				type: DataTypes.STRING,
			},
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	)
	return User
}
