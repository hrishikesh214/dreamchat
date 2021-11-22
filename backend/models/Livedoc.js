module.exports = (sequelize, DataTypes, Model) => {
	class Livedoc extends Model {
		setContent(content) {
			this.content = JSON.stringify(content)
		}
		getContent() {
			return JSON.parse(this.content)
		}
	}

	Livedoc.init(
		{
			id: {
				type: DataTypes.STRING(40),
				primaryKey: true,
				comment: "c0914af7-0d63-4308-9ff8-7ee11d6e41ee",
			},
			content: {
				type: DataTypes.TEXT,
			},
		},
		{
			sequelize,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	)
	return Livedoc
}
