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

var question = [{
	name: "view",
	type: "list",
	message: "Which view do you want to enter?",
	choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
}];

var aciton = '';

ask();

function go (action) {
	switch (action) {
	  case "View Products for Sale":
	    productView()
	    break;
	  case "View Low Inventory":
	    lowInventory()
	    break;
	  case "Add to Inventory":
	    addIventory()
	    break;
	  case "Add New Product":
	    
	    break;
	}	
}



function ask() {
  inquirer
    .prompt(question)
    .then(function(answer) {
    	action = answer.view;
    	go(action)
    });
};

function productView() {
	connection.query("SELECT * FROM products", 
	function(err, res) {
	  for(var i = 0; i < res.length; i++) {
      console.log("Product Name: " + res[i].product_name);
      console.log("Item ID: " + res[i].item_id);
      console.log("Price: $" + res[i].price);
      console.log("Quantity in stock: " + res[i].stock_quantity);
      console.log("<><><><><><><><><>");
	  };
	});
};

function lowInventory() {
	connection.query("SELECT * FROM products", 
	function(err, res) {
	  for(var i = 0; i < res.length; i++) {
		if( res[i].stock_quantity < 15){
			console.log(res[i]);
		}
	  };
	});
};

function addIventory() {
  inquirer
    .prompt([{
    	name: "add",
    	type: "input",
    	message: "What product do you want to order more of(Item ID)"
    }])
    .then(function(answer) {
    	var a = answer.add;
    	console.log(a);
    });
}