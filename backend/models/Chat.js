module.exports = (sequelize, DataTypes, Model) => {
	class Chat extends Model {}

	Chat.init(
		{
			id: {
				type: DataTypes.STRING(10),
				primaryKey: true,
				comment: "C/G123456",
			},
			type: {
				type: DataTypes.STRING(2),
				comment: "C/G",
			},
			last_message_id: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
		},
		{
			sequelize,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	)
	return Chat
}
