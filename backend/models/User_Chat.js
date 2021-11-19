module.exports = (sequelize, DataTypes, Model) => {
	class UC extends Model {}

	UC.init(
		{
			chat_id: {
				type: DataTypes.STRING(10),
				comment: "C/G123456",
			},
			user_id: {
				type: DataTypes.STRING(10),
				comment: "U123456",
			},
		},
		{
			sequelize,
			createdAt: "created_at",
			updatedAt: "updated_at",
			tableName: "user_chat",
		}
	)
	return UC
}
