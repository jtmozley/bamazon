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
  showItems();
});

function showItems() {
  query = "SELECT * FROM bamazon.products";
  connection.query(query, function(err, res) {
    console.table(res);
    qAndA();
  });
}

function qAndA() {
  inquirer.prompt([
    {
      type: "list",
      name: "whatToBuy",
      message:
        "Please select the ID number of the item you would like to purchase",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
      type: "input",
      name: "howMany",
      message: "How many of this item would you like to purchase?"
    }
  ])
  .then(function());
}
