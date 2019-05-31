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
  startPrompt();
});

function startPrompt() {
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
}

function viewProd() {
  query = "SELECT * FROM bamazon.products";
  connection.query(query, function(err, res) {
    console.table(res);
    startPrompt();
  });
}

function lowInv() {
  query = "SELECT * FROM bamazon.products";
  var lowInv = [];
  connection.query(query, function(err, res) {
    for (let i = 0; i < res.length; i++) {
      var element = res[i];
      if (element.stock_quantity <= 5) {
        lowInv.push(element);
      }
    }
    console.table(lowInv);
    startPrompt();
  });
}

function addInv() {
  query = "SELECT * FROM bamazon.products";
  connection
    .query(query, function(err, res) {
      console.table(res);
      inquirer
        .prompt([
          {
            type: "input",
            name: "index",
            message:
              "Please select an ID for a product you'd like to change inventory count"
          },
          {
              type: "input",
              name: "toChange",
              message: "What would you like to change the count to?"
          }
        ])
        .then(function(response) {
          query = `UPDATE bamazon.products SET stock_quantity = '${response.toChange}' WHERE (id = '${response.index}')`;
          connection.query(query, function(err, res) {
            console.log("Inventory successfully changed");
            startPrompt();
          });
        });
    })
}

function newProd() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "productName",
        message: "Product Name:"
      },
      {
        type: "input",
        name: "departmentName",
        message: "Department Name:"
      },
      {
        type: "input",
        name: "stock",
        message: "Stock Quantity:"
      },
      {
        type: "input",
        name: "price",
        message: "List Price:"
      }
    ])
    .then(function(response) {
      query = `INSERT INTO bamazon.products (product_name, department_name, stock_quantity, price) 
      VALUES ("${response.productName}", "${response.departmentName}", ${
        response.stock
      }, ${response.price})`;
      connection.query(query, function(err, res) {
        console.log("Product seccessfully added.");
        startPrompt();
      });
    });
}
