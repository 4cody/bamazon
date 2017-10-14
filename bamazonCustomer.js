// npm modules
var mysql = require("mysql");
var inquirer = require("inquirer");

// db connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123Lanark",
  database: "bamazon_db"
});


var questions = [{
  name: "Id",
  type: "input",
  message: "What is the ID of the product you wish to purchase?"
},
{
  name: "Quantity",
  type: "input",
  message: "How many units do you want to purchase?"
}]

// connectiong and product listing on file start
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  list();
});


// Query the database for product list and display
function list() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for(var i = 0; i < res.length; i++) {
      console.log("Product Name: " + res[i].product_name);
      console.log("Item ID: " + res[i].item_id);
      console.log("Price: $" + res[i].price);
      console.log("<><><><><><><><><>") 
    }
    // call the ask function
    ask();
  });
};

// Promts for item to purchase and quanty
function ask() {
  inquirer
    .prompt(questions)
    .then(function(answer) {
      connection.query("SELECT * FROM products WHERE ?", 
        { item_id: answer.Id }, function(err, res) {
          for(var i = 0; i < res.length; i++) {
            // store items from database
            var item = res[i].product_name;
            var quant = res[i].stock_quantity;
            // checks if the sufficent stock 
            if(answer.Quantity < quant) {
              var mod = quant - answer.Quantity;
              console.log("processing your order...") 
              connection.query("UPDATE products SET ? WHERE ?",
              [{
                stock_quantity: mod
              },
              {
                item_id: answer.Id
              }]);
              // calculate total cost
              var cost = res[i].price * answer.Quantity;
              // order complete lost total
              console.log('Thank you, your total is ' + cost);
            }else {
              // item not sufficient stock
              console.log("we don't have enough to fill that order")
              // recall item list to make another selection
              list();
            }
          };
      });
    });
};

