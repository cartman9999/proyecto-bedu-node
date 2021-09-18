module.exports = (sequelize, DataTypes) => {
    const Lecture = sequelize.define("Lecture", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return Lecture
}