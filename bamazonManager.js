var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

inquirer
  .prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ])
  .then(function(response) {
    switch (response.mainMenu) {
      case "View Products for Sale":
        break;
      case "View Low Inventory":
        break;
      case "Add to Inventory":
        break;
      case "Add New Product":
        break;

      default:
        break;
    }
  });
