module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'user',
        {
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                Comment: 'DB 컬럼 번호'
            },
            email: {
                type: DataTypes.STRING(80),
                allowNull: false,
                unique: true,
                //email 타입 체크
                validate: {
                    isEmail: true
                },
                Comment: 'email id 형식'
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            created_At: {
                type: DataTypes.DATE,
                allowNull: false,
                defalutValue: sequelize.literal('now()'),
            }
        },
        {
            timestamps: false,
            tableName: 'user'
        },
    );
