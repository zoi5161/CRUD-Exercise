const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  const { firstName, lastName, username, mobile, isAdmin} = req.body;
  try{
    await models.User.create({
      firstName,
      lastName,
      username,
      mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users");
  } catch(error){
    console.error(error);
  }
}

controller.editUser = async (req, res) => {
  const { id, firstName, lastName, mobile, isAdmin} = req.body;
  try {
    await models.User.update(
      {
        firstName,
        lastName,
        mobile,
        isAdmin: isAdmin ? true : false
      },
      {
        where: { id },
      }
    );
    res.send("User has been updated!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Can not update user!");
  }
}

controller.deleteUser = async (req, res) => {
  const id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.User.destroy({ where: { id } });
    res.send("User has been deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Can not delete user!");
  }
}

module.exports = controller;
