// declare variables

	var screenWidth = 960;
	var screenHeight = 1280;
	var start;
	var plate;
	var route;
	var gameData = ["","",""];
	var startPosition = 3;
	var showingRoute = false;

//select robot starting position 
	function left()
		{
	    	start = document.getElementById("centerStart");
	    	start.remove();
	    	start = document.getElementById("rightStart");
	    	start.remove();
	    	startPosition = 0;
		}
	function center()
		{
	    	start = document.getElementById("rightStart");
	    	start.remove();
	    	start = document.getElementById("leftStart");
	    	start.remove();
	    	startPosition = 1;
		}
	function right()
		{
	   		start = document.getElementById("centerStart");
	    	start.remove();
	    	start = document.getElementById("leftStart");
	    	start.remove();
	    	startPosition = 2;
		}
	
//select gameData switch/scale colors
	function rightNearSwitch()
		{
    		plate = document.getElementById("0R");
        	plate.setAttribute("style", "fill:blue;fill-opacity:0.6");  
    		plate = document.getElementById("0L");
        	plate.setAttribute("style", "fill:red;fill-opacity:0.6"); 
        	gameData[0] = "R"; 
        	showRoutes();
    	}
	function leftNearSwitch()
		{
    		plate = document.getElementById("0R");
        	plate.setAttribute("style", "fill:red;fill-opacity:0.6");  
    		plate = document.getElementById("0L");
        	plate.setAttribute("style", "fill:blue;fill-opacity:0.6");  
        	gameData[0] = "L"; 
        	showRoutes();
    	}
	function rightScale()
		{
    		plate = document.getElementById("1R");
        	plate.setAttribute("style", "fill:blue;fill-opacity:0.6");  
    		plate = document.getElementById("1L");
        	plate.setAttribute("style", "fill:red;fill-opacity:0.6");  
        	gameData[1] = "R"; 
        	showRoutes();
    	}
	function leftScale()
		{
    		plate = document.getElementById("1R");
        	plate.setAttribute("style", "fill:red;fill-opacity:0.6");  
    		plate = document.getElementById("1L");
        	plate.setAttribute("style", "fill:blue;fill-opacity:0.6");  
        	gameData[1] = "L"; 
        	showRoutes();
    	}
	function rightFarSwitch()
		{
    		plate = document.getElementById("2R");
        	plate.setAttribute("style", "fill:blue;fill-opacity:0.6");  
    		plate = document.getElementById("2L");
        	plate.setAttribute("style", "fill:red;fill-opacity:0.6");  
        	gameData[2] = "R"; 
        	showRoutes();
    	}
	function leftFarSwitch()
		{
    		plate = document.getElementById("2R");
        	plate.setAttribute("style", "fill:red;fill-opacity:0.6");  
    		plate = document.getElementById("2L");
        	plate.setAttribute("style", "fill:blue;fill-opacity:0.6");  
        	gameData[2] = "L"; 
        	showRoutes();
    	}
//show routes depending on start position and game data
	function showRoutes()
	{
		switch (startPosition){
		case 0:		//start left
			if ((gameData[0] == "L") && (gameData[1] == "L"))
				{
					if (showingRoute == true)
						{
						 	route[0].setAttribute("style", "display:none");  
							route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:none"); 
  						}
		        	route = document.getElementsByClassName("LLXl");
					route[0].setAttribute("style", "display:block");  
					route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:block");
					showingRoute = true;  
				}
			if ((gameData[0] == "R") && (gameData[1] == "L"))
				{
					if (showingRoute == true)
						{
						 	route[0].setAttribute("style", "display:none");  
							route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:none");
						}
		        	route = document.getElementsByClassName("RLXl");
					route[0].setAttribute("style", "display:block");  
					route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:block");  
					showingRoute = true;  
				}		
       		break;
		case 1:		//start center
			if ((gameData[0] == "L") && (gameData[1] == "L"))
				{
					if (showingRoute == true)
						{
						 	route[0].setAttribute("style", "display:none");  
							route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:none");
						}
		        	route = document.getElementsByClassName("LLXc");
					route[0].setAttribute("style", "display:block");  
					route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:block");
					showingRoute = true;  
				}
			if ((gameData[0] == "R") && (gameData[1] == "R"))
				{
					if (showingRoute == true)
						{
						 	route[0].setAttribute("style", "display:none");  
							route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:none");
						}
		        	route = document.getElementsByClassName("RRXc");
					route[0].setAttribute("style", "display:block");  
					route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:block");
					showingRoute = true;  
				}
			break;
		case 2:		//start right
			if ((gameData[0] == "R") && (gameData[1] == "R"))
				{
					if (showingRoute == true)
						{
						 	route[0].setAttribute("style", "display:none");  
							route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:none");
						}
		        	route = document.getElementsByClassName("RRXr");
					route[0].setAttribute("style", "display:block");  
					route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:block");  
					showingRoute = true;  
				}		
			if ((gameData[0] == "L") && (gameData[1] == "R"))
				{
					if (showingRoute == true)
						{
						 	route[0].setAttribute("style", "display:none");  
							route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:none");
						}
		        	route = document.getElementsByClassName("LRXr");
					route[0].setAttribute("style", "display:block");  
					route[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:block");  
					showingRoute = true;  
				}		
			break;
		case 3:		//no start position chosen				
				alert("Choose a start position!");
			break;
		}
	}