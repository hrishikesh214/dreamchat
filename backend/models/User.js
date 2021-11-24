const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes, Model) => {
	class User extends Model {
		setPassword(password) {
			this.password = bcrypt.hashSync(password, 10)
		}
		checkPassword(password) {
			return bcrypt.compareSync(password, this.password)
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
			email: {
				type: DataTypes.STRING(30),
			},
			gender: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			hobbies: {
				type: DataTypes.TEXT,
				defaultValue: "",
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
