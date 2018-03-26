// declare variables

	var screenWidth = 960;
	var screenHeight = 1280;
	var m;
	var gameData = ["","",""];
	var startPosition = 3;

//select robot starting position 
	function left()
		{
	    	m = document.getElementById("centerStart");
	    	m.remove();
	    	m = document.getElementById("rightStart");
	    	m.remove();
	    	startPosition = 0;
		}
	function center()
		{
	    	m = document.getElementById("rightStart");
	    	m.remove();
	    	m = document.getElementById("leftStart");
	    	m.remove();
	    	startPosition = 1;
		}
	function right()
		{
	   		m = document.getElementById("centerStart");
	    	m.remove();
	    	m = document.getElementById("leftStart");
	    	m.remove();
	    	startPosition = 2;
		}
	
//select gameData switch/scale colors
	function rightNearSwitch()
		{
    		m = document.getElementById("0R");
        	m.setAttribute("style", "fill:blue;fill-opacity:0.6");  
    		m = document.getElementById("0L");
        	m.setAttribute("style", "fill:red;fill-opacity:0.6"); 
        	gameData[0] = "R"; 
        	showRoutes();
    	}
	function leftNearSwitch()
		{
    		m = document.getElementById("0R");
        	m.setAttribute("style", "fill:red;fill-opacity:0.6");  
    		m = document.getElementById("0L");
        	m.setAttribute("style", "fill:blue;fill-opacity:0.6");  
        	gameData[0] = "L"; 
        	showRoutes();
    	}
	function rightScale()
		{
    		m = document.getElementById("1R");
        	m.setAttribute("style", "fill:blue;fill-opacity:0.6");  
    		m = document.getElementById("1L");
        	m.setAttribute("style", "fill:red;fill-opacity:0.6");  
        	gameData[1] = "R"; 
        	showRoutes();
    	}
	function leftScale()
		{
    		m = document.getElementById("1R");
        	m.setAttribute("style", "fill:red;fill-opacity:0.6");  
    		m = document.getElementById("1L");
        	m.setAttribute("style", "fill:blue;fill-opacity:0.6");  
        	gameData[1] = "L"; 
        	showRoutes();
    	}
	function rightFarSwitch()
		{
    		m = document.getElementById("2R");
        	m.setAttribute("style", "fill:blue;fill-opacity:0.6");  
    		m = document.getElementById("2L");
        	m.setAttribute("style", "fill:red;fill-opacity:0.6");  
        	gameData[2] = "R"; 
        	showRoutes();
    	}
	function leftFarSwitch()
		{
    		m = document.getElementById("2R");
        	m.setAttribute("style", "fill:red;fill-opacity:0.6");  
    		m = document.getElementById("2L");
        	m.setAttribute("style", "fill:blue;fill-opacity:0.6");  
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
		        	m = document.getElementsByClassName("XLLl");
					m[0].setAttribute("style", "display:block");  
					m[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:block");  
				}
       		break;
		case 1:		//start center
			if ((gameData[0] == "L") && (gameData[1] == "L"))
				{
				alert("C");
				}
			break;
		case 2:		//start right
			if ((gameData[0] == "R") && (gameData[1] == "R"))
				{
		        	m = document.getElementsByClassName("XRRr");
					m[0].setAttribute("style", "display:block");  
					m[1].setAttribute("style", "stroke:red; stroke-width:2; fill:none; display:block");  
				}		
			break;
		case 3:		//start center
			if ((gameData[0] == "L") && (gameData[1] == "L"))
				{
				alert("Choose a start position!");
				}
			break;
		}
	}