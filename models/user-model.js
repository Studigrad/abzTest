module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        email:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        position_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
       },
      data: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
      }
    });
    return User;
  };
  /*id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
  */