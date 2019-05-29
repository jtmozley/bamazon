var inquirer = require("inquirer");
var mysql = require("mysql");

var query;

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
        viewProd();
        break;
      case "View Low Inventory":
        lowInv();
        break;
      case "Add to Inventory":
        addInv();
        break;
      case "Add New Product":
        newProd();
        break;

      default:
        break;
    }
  });

function viewProd() {
  query = "SELECT * FROM bamazon.products";
  connection.query(query, function(err, res) {
    console.table(res);
  });
}

function lowInv() {
  query = "SELECT * FROM bamazon.products";
  connection.query(query, function(err, res) {
    for (let i = 1; i < res.length; i++) {
      var element = res[i];
      if (element.stock_quantity <= 5) {
        console.table(element);
      }
    }
  });
}

function addInv() {
    
}
function newProd(params) {}
