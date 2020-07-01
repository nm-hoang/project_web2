const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');

/*model user*/
const Model = Sequelize.Model;

class User extends Model {
    static async findUserById(id){
        return User.findByPk(id);
    }
    static  async findUserByEmail(email){
        return User.findOne({
            where: {
                email,
            }
        });
    }
    static verifyPassword(password,passhash){
        return bcrypt.compareSync(password, passhash);
    }
    static hashPassword(password){
        return bcrypt.hashSync(password, 10);
    }
}
User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  paper_type:{
    type: Sequelize.STRING,
    
    // allowNull defaults to true
  },
  number_paper:{
    type: Sequelize.STRING,
    
    // allowNull defaults to true
  },
  date_range:{
    type: Sequelize.DATE,
    
    // allowNull defaults to true
  },
  account_number:{
    type: Sequelize.STRING,
    unique: true
    // allowNull defaults to true
  },
  active:{
    type: Sequelize.BOOLEAN,
  },
  adminRole: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
},
}, {
  sequelize: db,
  modelName: 'user'
  // options
});

module.exports = User;