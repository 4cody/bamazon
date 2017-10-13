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
	name: "whatId",
	type: "input",
	message: "What is the ID of the product you wish to purchase?"
}]

// connectiong and product listing on file start
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
	  if (err) throw err;
	  for(var i = 0; i < res.length; i++) {
	  	console.log("Product Name: " + res[i].product_name);
	  	console.log("Item ID: " + res[i].item_id);
	  	console.log("Price: $" + res[i].price);
	  	console.log("<><><><><><><><><>") 
	  }
	  ask();
	});
});

// asks customer to choose a product by ID#

function ask() {
  inquirer
    .prompt(questions)
    .then(function(answer) {
      connection.query("SELECT * FROM products WHERE ?", { item_id: answer.whatId }, function(err, res) {
        for(var i = 0; i < res.length; i++)
      });
    });
};


function foo() {
	var x = connection.query("SELECT * FROM products WHERE product_name = cheese");
	console.log(x);
}
//"You have chose the item" + res[answer].product_name
// / { whatId: answer.whatId }