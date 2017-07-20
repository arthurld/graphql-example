import Sequelize from 'sequelize'

const Conn = new Sequelize(
    'graphql-example',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

const Person = Conn.define( 'people', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
} );

const Post = Conn.define( 'posts', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_person: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
} );

const User = Conn.define( 'users', {
    user_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
} );

//Relations
//
Person.hasMany(Post, { foreignKey: "id_person" });
Post.belongsTo(Person, { foreignKey: "id_person" });
//

Conn.authenticate().then( () => {
    console.log('Connection estabilished.');
    Conn.sync();
} ).error( error => console.log(error) );

export default Conn;
