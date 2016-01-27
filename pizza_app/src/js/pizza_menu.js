
//--------------------------------------------------------------------------------------
// PizzaMenu: class constructor
//
//  PizzaMenu requires:
//  - function Timer() (from timer.js)
//  - function PizzaDesigner() (from pizza_designer.js)

function PizzaMenu( pizzaDesigner, pizzaMenuSize) {

	 // array pizzas holds the pizzas returned by the calls
	 // to pizzaDesigner in generatePizzas() below
	 var pizzas = [];

	 // the following properties are initialized in 
	 // method init() below.
	 var pizzaSize;
	 var sizeSlider;
	 var pizzaMenu;

    // pizzaMenuTemplate is a mustache template included in index.html.
    // It is initialized and used in generatePizzas() below.
	 var pizzaMenuTemplate;

    //---------------------------------------------------------------------------------

    // Just the pure slider logic here.
    // The select statements have been replaced with obj literals.
    // The timing code has been extracted and generalized in timer.js
    // And the logging code has been put in a separate function (below)
    //
	 function resizePizzas(size) { 
		  var text = { 1: "Small", 2: "Medium", 3: "Large" }[size];
		  var width = { 1: '25%', 2: '33%', 3: '50%' }[size];
		  pizzaSize.innerHTML = text;
		  for (var i=0; i<pizzas.length; i++) {
				pizzas[i].element.style.width = width;
		  }
    }

    // function logResize() is passed timer during init()
    function logResize(times) {
		  console.log("Time to resize pizzas: " + times[times.length-1].duration + "ms");
    }

    //---------------------------------------------------------------------------------

    // generatePizzas() is called from init() when the page is loaded.
    // The timing code has been extracted and generalized in timer.js
    // And the logging code has been put in a separate function (below)
    //
	 function generatePizzas() {
		  var pizza;
        var i;

        // create the "semantic" pizzas (see pizza_designer.js)
		  for (i=0; i < pizzaMenuSize; i++) {
				pizza = pizzaDesigner('pizza_' + i);
				pizzas.push(pizza);
		  }
        // get the template from the document and render the html views for
        // the pizzas on the menu.
		  pizzaMenuTemplate = document.getElementById('pizza-menu-template').innerHTML;
		  pizzaMenu.innerHTML = Mustache.render(pizzaMenuTemplate, {pizzas: pizzas});
		  for (i = 0; i < pizzas.length; i++) {
				pizza = pizzas[i];
				pizza.element = document.getElementById(pizza.id);
		  }
	 }

    // function logGenerate()  is passed timer during init()
    function logGenerate(times) {
		  console.log("Time to generate pizzas on load: " + times[0].duration + "ms");
    }

    //---------------------------------------------------------------------------------

	 function init() {

        // hook into the html
		  pizzaSize = document.querySelector("#pizza-size");
		  sizeSlider = document.querySelector("#size-slider");
		  pizzaMenu = document.getElementById("pizza-menu");

        // hook resizePizzas() to the slider
		  sizeSlider.onchange = timerWrap("resize", resizePizzas, logResize);

        // run generatePizzas()
        timerWrap('generate', generatePizzas, logGenerate)();
    }

	 return {
		  init: init,
		  pizzas: pizzas,
    };

} // end PizzaMenu: class constructor


