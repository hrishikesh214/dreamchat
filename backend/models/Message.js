module.exports = (sequelize, DataTypes, Model, ...opts) => {
	class Message extends Model {
		setContent(content) {
			this.content = JSON.stringify(content)
		}
		getContent() {
			return JSON.parse(this.content)
		}
	}

	Message.init(
		{
			id: {
				type: DataTypes.STRING(10),
				primaryKey: true,
				comment: "M123456",
			},
			sender_id: {
				type: DataTypes.STRING(10),
				comment: "sent by",
				refrences: {
					model: require("./User"),
					key: "id",
				},
			},
			chat_id: {
				type: DataTypes.STRING(10),
				comment: "belongs to which chat",
			},
			content: {
				type: DataTypes.TEXT,
				comment: "content can be anything",
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				comment: "is deleted",
			},
		},
		{
			sequelize,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	)
	return Message
}
