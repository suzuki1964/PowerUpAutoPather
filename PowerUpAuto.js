// declare variables

	var screenWidth = 960;
	var screenHeight = 1280;
	var k=2;				// scaling for field (twice as many pixel as inches IRL)
	var robotCenter = [204, 406 - 36];		// center of the front of the robot (in inches from upper left corner)
	var LEFTSTART = [48 + 15.75, 406 - 36];			// farthest left starting position for robot
	var CENTERSTART = [180 - 12 + 36, 406 - 36];		//center of center starting position for robot
	var RIGHTSTART = [312 - 15.75, 406 - 36];		//farthest right starting position for robot
	var canvas;
	var ctx;
	var i = 0;
	var j = 0;
	var x = 204;				// initial coordinates for front center of robot
	var y = 370;
	var next_x=204;				// robot coordinates incremented
	var next_y=370;
	var c;					// click event
	var m;					// scaling for actual robot distance
	var cursorPosition = [0,0];
	var startPosition = [0, 0];		// center of the front of the robot at beginning of route
	var lastPosition = [0, 0];		// center of the front of the robot at end of route
	var forwardDistance = 0;		//distance in feet robot should travel forward
	var distance = 0;
	var angleTurnRight = 0;		//angle in degrees robot should turn clockwise
	var angle = 0;
	var interval;
	var ready = false;
	var driving = false;		//is robot driving?


rightSwitch();
function rightSwitch()
	{
    	m = document.getElementById("2R");
        m.setAttribute("style", "fill:blue;fill-opacity:0.6");  

    }	    



/*	
drawField();
leftScale();
rightScale();
leftSwitch();
rightSwitch();
chooseStart();
//tryRoute();
//saveRoute();

function drawField()
	{	
		var canvas=document.getElementById('FieldCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = -10;
		ctx.fillStyle = 'white';		//make field white and therefore opaque so other canvases can be hidden
	    ctx.fillRect(0,0,screenWidth,screenHeight);

		//platform and scale
			ctx.beginPath();
				ctx.moveTo(113*k,20*k);		//start at corner of platform
				ctx.lineTo(246*k,20*k);		//go to far corner of platform
				ctx.lineTo(246*k,58*k);		//to side of scale	
				ctx.lineTo(270*k,58*k);		//to front of scale
				ctx.lineTo(270*k,106*k);	//to side of scale
				ctx.lineTo(246*k,106*k);	//back to platform
				ctx.lineTo(246*k,144*k);	//to corner of platform
				ctx.lineTo(113*k,144*k);	//to third corner of platform
				ctx.lineTo(113*k,106*k);	//to edge of other scale				
				ctx.lineTo(89*k,106*k);		//to front of scale
				ctx.lineTo(89*k,58*k);		//to side of scale
				ctx.lineTo(113*k,58*k);		//to edge of platform
				ctx.lineTo(113*k,20*k);		//to back to corner of platform
				ctx.stroke();
		
		//outline of field			
			ctx.beginPath();
				ctx.moveTo(18*k,20*k);
				ctx.lineTo(18*k,370*k);		//edge of field
				ctx.lineTo(48*k,406*k);		//to starting edge
				ctx.lineTo(312*k,406*k);	//to far side of starting edge
				ctx.lineTo(342*k,370*k);	//to far side of field
				ctx.lineTo(342*k,20*k);		//far edge of field
				ctx.stroke();
				
		//switch		
				ctx.strokeRect(104*k,210*k,153*k,56*k);		//upper left corner (104,210), width 153, height 56
				
		//PC zone
				ctx.strokeRect(157*k,266*k,46*k,42*k);	//upper left corner (157,266), width 46, height 42
				
		//exchange zone
				ctx.strokeRect(120*k,370*k,48*k,36*k);	//upper left corner (120,370), width 48, height 36
	
		//loop over cubes along switch
		for (var i = 0; i < 6; i += 1)
			{
				ctx.strokeRect((104 + (27.8 * i))*k,196*k,14*k,14*k);	//upper left corner (104,196), width 14, height 14
		//switch width 153; subtract out 14 * 6 blocks, divide by 5 to find width of spaces, shift by width of block+space
			}

		//front cube in PC zone
				ctx.strokeRect(173*k,294*k,14*k,14*k);	//middle of bottom of P zone
	}
	
function leftScale()
	{
		var canvas=document.getElementById('LScaleCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = -50;	    
	    ctx.strokeStyle = "blue";

		//left scale
		ctx.strokeRect(89*k,58*k,36*k,48*k);		//upper left corner (89,58), width 36, height 48		
	}
	
function rightScale()
	{
		var canvas=document.getElementById('RScaleCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = -60;	    
	    ctx.strokeStyle = "blue";
	    
		//right scale
		ctx.strokeRect(234*k,58*k,36*k,48*k);		//upper left corner (234,58), width 36, height 48			
	}
	
function leftSwitch()
	{
		var canvas=document.getElementById('LSwitchCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = -70;	    
	    ctx.strokeStyle = "blue";
	    
		//left switch
		ctx.strokeRect(108*k,214*k,36*k,48*k);		//upper left corner (108,214), width 36, height 48			
	}
	
function rightSwitch()
	{
		var canvas=document.getElementById('RSwitchCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = -80;	    
	    ctx.strokeStyle = "blue";
	    
		//right switch
		ctx.strokeRect(217*k,214*k,36*k,48*k);		//upper left corner (217,214), width 36, height 48			
	}

function showLL()
	{
		document.getElementById('LScaleCanvas').style.zIndex = 50;
		document.getElementById('LSwitchCanvas').style.zIndex = 70;	
	}
	
function hideLL()
	{
		document.getElementById('LScaleCanvas').style.zIndex = -50;
		document.getElementById('LSwitchCanvas').style.zIndex = -70;	
	}
	
function showLR()
	{
		document.getElementById('LScaleCanvas').style.zIndex = 50;
		document.getElementById('RSwitchCanvas').style.zIndex = 80;	
	}
	
function hideLR()
	{
		document.getElementById('LScaleCanvas').style.zIndex = -50;
		document.getElementById('RSwitchCanvas').style.zIndex = -80;	
	}
	
function showRL()
	{
		document.getElementById('RScaleCanvas').style.zIndex = 60;
		document.getElementById('LSwitchCanvas').style.zIndex = 70;	
	}
	
function hideRL()
	{
		document.getElementById('RScaleCanvas').style.zIndex = -60;
		document.getElementById('LSwitchCanvas').style.zIndex = -70;	
	}
	
function showRR()
	{
		document.getElementById('RScaleCanvas').style.zIndex = 60;
		document.getElementById('RSwitchCanvas').style.zIndex = 80;	
	}
	
function hideRR()
	{
		document.getElementById('RScaleCanvas').style.zIndex = -60;
		document.getElementById('RSwitchCanvas').style.zIndex = -80;	
	}
  
function chooseStart()
	{    
		hideRoutes();
		//hide the robot
		document.getElementById('RobotCanvas').style.zIndex = -20;
		//hide the route
		document.getElementById('RouteCanvas').style.zIndex = -40;
	
		var canvas=document.getElementById('StartCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = 100;
		ctx.strokeStyle = "red";
	
		drawRobot(ctx, LEFTSTART);
		drawRobot(ctx, CENTERSTART);
		drawRobot(ctx, RIGHTSTART);
		
		canvas.addEventListener("click", selectStartPosition);
    }
    	
function drawRobot(ctx, robotCenter)
	{
	// robotCenter gives the coordinates of the middle of the front edge	
		ctx.strokeRect((robotCenter[0] - 15.75)*k,(robotCenter[1]*k),31.5*k,36*k);		//draws robot rectangle
		
		ctx.beginPath();
		ctx.moveTo((robotCenter[0] - 7)*k,(robotCenter[1]*k));	//left grabber arm
		ctx.lineTo((robotCenter[0] - 7)*k,(robotCenter[1] - 7)*k );
		ctx.stroke();
			
		ctx.moveTo((robotCenter[0] + 7)*k,(robotCenter[1]*k));	//right grabber arm
		ctx.lineTo((robotCenter[0] + 7)*k,(robotCenter[1] - 7)*k );
		ctx.stroke();	
	}

function selectStartPosition(c)
	{
		//get cursor position to see which robot was chosen
		cursorPosition = [c.pageX, c.pageY];

		// check if the cursor is in the left robot
 		if ((cursorPosition[0] >= (LEFTSTART[0]-15.75)*k) && (cursorPosition[0] <= (LEFTSTART[0]+15.75)*k) 
 			&& (cursorPosition[1] >= LEFTSTART[1]*k) && (cursorPosition[1] <= (LEFTSTART[1]+36)*k))
 			{
				startPosition[0] = LEFTSTART[0];	
				startPosition[1] = LEFTSTART[1];	
				ready = true;
		  	}
			
		// check if the cursor is in the center robot
 		if ((cursorPosition[0] >= (CENTERSTART[0] - 15.75) * k) && (cursorPosition[0] <= (CENTERSTART[0] + 15.75)*k) 
 				&& (cursorPosition[1] >= (CENTERSTART[1])*k) && (cursorPosition[1] <= (CENTERSTART[1]+36)*k))
 			{
				startPosition[0] = CENTERSTART[0];
				startPosition[1] = CENTERSTART[1];
				ready = true;
		  	}

		// check if the cursor is in the right robot
 		if ((cursorPosition[0] >= (RIGHTSTART[0] - 15.75) * k) && (cursorPosition[0] <= (RIGHTSTART[0] + 15.75)*k) 
 				&& (cursorPosition[1] >= (RIGHTSTART[1])*k) && (cursorPosition[1] <= (RIGHTSTART[1]+36)*k))
  			{
				startPosition[0] = RIGHTSTART[0];
				startPosition[1] = RIGHTSTART[1];
				ready = true;
		  	}
		else		//otherwise keep listening for a click
			{
				chooseStart();
			}
		  		
		if (ready)
		  	{
				getReady();
			}
	}
	
function getReady()
	{
		//hide the robots in the three starting positions
		document.getElementById('StartCanvas').style.zIndex = -30;
		//hide the previous route
		document.getElementById('RouteCanvas').style.zIndex = -40;
				
		//get robot canvas
		canvas=document.getElementById('RobotCanvas');
		ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = -10;		//put it on top but below buttons
		ctx.strokeStyle = "blue";
				
		drawRobot(ctx, startPosition);
		showRoutes();			
		lastPosition[0] = startPosition[0];
		lastPosition[1] = startPosition[1];
		angleTurnRight = 0;
		ready = false;
	}


function showRoutes()		//display buttons to choose routes
	{
		hideLL();
		hideRR();
		var x = document.getElementById("rules");		//show message to choose route
    		x.style.display = "block";
 		var x = document.getElementById("StartButton");		//show message to choose route
    		x.style.display = "block";

 		for (var i = 0; i < 8; i += 1)
			{
				var x = document.getElementsByClassName("left");
 					if (startPosition[0] == LEFTSTART[0]){
    					x[i].style.display = "block";
  					} else {
		    			x[i].style.display = "none";
		    		}		
		    }	
  		for (var i = 0; i < 8; i += 1)
			{
				var x = document.getElementsByClassName("right");
 					if (startPosition[0] == RIGHTSTART[0]){
    					x[i].style.display = "block";
  					} else {
		    			x[i].style.display = "none";
		    		}	
		    }		
  		for (var i = 0; i < 8; i += 1)
			{
				var x = document.getElementsByClassName("center");
 					if (startPosition[0] == CENTERSTART[0]){
    					x[i].style.display = "block";
  					} else {
		    			x[i].style.display = "none";
		    		}			
			}
		}
function hideRoutes()		//hide buttons to choose routes
	{
		var x = document.getElementById("rules");		//hide message to choose route
    		x.style.display = "none";
 		var x = document.getElementById("StartButton");		//hide message to choose route
    		x.style.display = "none";
		for (var i = 0; i < 8; i += 1)
			{
				var x = document.getElementsByClassName("left");
    			x[i].style.display = "none";
    		}			
		for (var i = 0; i < 8; i += 1)
			{
				var x = document.getElementsByClassName("right");
    			x[i].style.display = "none";
    		}			
		for (var i = 0; i < 8; i += 1)
			{
				var x = document.getElementsByClassName("center");
    			x[i].style.display = "none";
    		}			

	}

function chooseRoute(j)
	{
		getReady();
		
		canvas=document.getElementById("RouteCanvas");
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = 100;		//put it on top but below buttons
		drawRobot(ctx, startPosition);
		lastPosition[0] = startPosition[0];
		lastPosition[1] = startPosition[1];
		i=0;
		route = j;
		nextStep(i,route);
	}

function nextStep(i,j)
	{
		switch (j){
		case 0:		//start R, drop block on R switch, get right block, put on R scale
			switch (i) {
   			case 0:
   				showRR();
        		goForward(130);		//start right
       			break;
  			case 1:
        		turn(-90);
        		goForward (37);		//go to right switch
       			break;
  			case 2:
        		goForward (-37);	//back up
       			break;
  			case 3:
        		turn(90);
        		goForward (70);		//head up to blocks behind switch
       			break;
  			case 4:
        		turn(-90);
        		goForward (45);		//line up with rightmost block
       			break;
	  		case 5:
        		turn(-90);
        		goForward (27);		//get rightmost block
       			break;
  			case 6:
        		goForward (-10);	//back up
       			break;
  			case 7:
        		turn (-90);
        		goForward (45)		//head to right side
       			break;
  			case 8:
        		turn (-90);
        		goForward(100);		//head to scale
       			break;
       		case 9:
        		turn (-90);
        		goForward(25);		//go to scale
       			break;
       		case 10:
 				//put the robot below the buttons
				document.getElementById('RobotCanvas').style.zIndex = -5;
				//put the route below the buttons
				document.getElementById('RouteCanvas').style.zIndex = -10;	
				showRoutes();
				break;
       		}
       		break;
		case 1:		//start R, drop block on R scale, get R block, put on R switch
			switch (i) {
   			case 0:
	       		goForward(280);		//start right
       			break;
  			case 1:
        		turn(-90);
        		goForward (25);		//go to right scale
       			break;
  			case 2:
        		goForward (-30);	//back up
       			break;
  			case 3:
        		turn(-60);
        		goForward (102);		//go to right scale
       			break;
  			case 4:
        		turn(-30);
        		goForward (17);		//go to right scale
       			break;
       		case 5:
 				//put the robot below the buttons
				document.getElementById('RobotCanvas').style.zIndex = -5;
				//put the route below the buttons
				document.getElementById('RouteCanvas').style.zIndex = -10;	
				showRoutes();
				break;
       		}
			break;
		case 2:		//start L, drop block on L scale, get L block, put on L switch
			switch (i) {
   			case 0:
   				showLL();
        		goForward(280);		//start right
       			break;
  			case 1:
         		turn(90);
        		goForward (24);		//go to right scale
       			break;
  			case 2:
        		goForward (-30);	//back up
       			break;
  			case 3:
         		turn(60);
        		goForward (106);		//go to right scale
       			break;
  			case 4:
         		turn(30);
        		goForward (16);		//go to right scale
      			break;
			case 5:
 				//put the robot below the buttons
				document.getElementById('RobotCanvas').style.zIndex = -5;
				//put the route below the buttons
				document.getElementById('RouteCanvas').style.zIndex = -10;			
				showRoutes();
				break;     			
       		}
			break;
		case 3:		//start L, drop block on L scale, get R block, put on R scale
			switch (i) {
   			case 0:
   				showLR();
       			goForward(280);		//start right
       			break;
  			case 1:
        		turn(90);
        		goForward (24);		//go to right scale
       			break;
  			case 2:
        		goForward (-30);	//back up
       			break;
  			case 3:
        		turn(60);
        		goForward (95);		//go to right scale
       			break;
  			case 4:
        		turn(-60);
        		goForward (144);		//go to right scale
       			break;
  			case 5:
        		turn(90);
        		goForward (23);		//go to right scale
       			break;
       		case 6:
 				//put the robot below the buttons
				document.getElementById('RobotCanvas').style.zIndex = -5;
				//put the route below the buttons
				document.getElementById('RouteCanvas').style.zIndex = -10;			
				showRoutes();
				break;
       		}
       		break;
		case 4:		//start R, drop block on R scale, get L block, put on L scale
			switch (i) {
   			case 0:
       			goForward(280);		//start right
       			break;
  			case 1:
        		turn(-90);
        		goForward (24);		//go to right scale
       			break;
  			case 2:
        		goForward (-30);	//back up
       			break;
  			case 3:
        		turn(-60);
        		goForward (95);		//go to right scale
       			break;
  			case 4:
        		turn(60);
        		goForward (143);		//go to right scale
       			break;
  			case 5:
        		turn(-90);
        		goForward (23);		//go to right scale
       			break;
       		case 6:
 				//put the robot below the buttons
				document.getElementById('RobotCanvas').style.zIndex = -5;
				//put the route below the buttons
				document.getElementById('RouteCanvas').style.zIndex = -10;	
				showRoutes();
				break;
       		}
			break;
		case 5:
			switch (i) {
			case 0:
				goForward (150);
				break;
			case 1:
 				//put the robot below the buttons
				document.getElementById('RobotCanvas').style.zIndex = -5;
				//put the route below the buttons
				document.getElementById('RouteCanvas').style.zIndex = -10;			
				showRoutes();
				break;
			}
			break
		}
	}

function goForward(distance)
	{
		x=lastPosition[0];
		y=lastPosition[1];
		forwardDistance = distance;
		driving = true;
		
		interval=setInterval("drawRoute()",10);
	}
	
function drawRoute()
	{

		if (driving)
		{
			canvas=document.getElementById("RouteCanvas");  //draw route in red
			ctx=canvas.getContext('2d');
			ctx.strokeStyle = "red";
			ctx.lineWidth = 4;

			if ((Math.abs(x - lastPosition[0]) <= Math.abs(forwardDistance * Math.sin(angleTurnRight * Math.PI / 180)))  && (Math.abs(y - lastPosition[1]) <= Math.abs(forwardDistance * Math.cos(angleTurnRight * Math.PI / 180))))
				{
					next_x = x + (forwardDistance/Math.abs(forwardDistance))*Math.sin(angleTurnRight * Math.PI / 180);
					next_y = y - (forwardDistance/Math.abs(forwardDistance))*Math.cos(angleTurnRight * Math.PI / 180);
					ctx.beginPath();
					ctx.moveTo(x * k,y * k);
					ctx.lineTo(next_x * k,next_y * k);
					ctx.stroke();
					
					canvas=document.getElementById('RobotCanvas');		//move robot along path (in blue)
					ctx=canvas.getContext('2d');
					canvas.width=screenWidth;
					canvas.height=screenHeight;
					canvas.style.zIndex = 100;
					ctx.strokeStyle = "blue";
					ctx.rotate(angleTurnRight*Math.PI/180);
		  			drawRobot(ctx, [(next_x * Math.cos(angleTurnRight * Math.PI / 180)) + (next_y * Math.sin(angleTurnRight * Math.PI / 180)),(next_y * Math.cos(angleTurnRight * Math.PI / 180)) - (next_x * Math.sin(angleTurnRight * Math.PI / 180))]);

					x=next_x;
					y=next_y;
				}
			else
				{
					lastPosition[0] = x;
					lastPosition[1] = y;
					i=i+1;
					clearInterval(interval);
					nextStep(i,route);
				}
			}
	}

function turn(angle)
	{
		if (driving)
			{
				angleTurnRight = angleTurnRight + angle;
			}
	}
*/