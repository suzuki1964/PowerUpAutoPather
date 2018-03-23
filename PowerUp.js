// declare variables

	var screenWidth = 960;
	var screenHeight = 1280;
	var k=2;				// scaling for field (twice as many pixel as inches IRL)
	var robotCenter = [204, 406 - 36];		// center of the front of the robot (in inches from upper left corner)
	var leftStart = [48 + 15.75, 406 - 36];			// farthest left starting position for robot
	var centerStart = [180 - 12 + 36, 406 - 36];		//center of center starting position for robot
	var rightStart = [312 - 15.75, 406 - 36];		//farthest right starting position for robot
	var canvas;
	var ctx;
	var i=0;
	var x=204;				// initial coordinates for front center of robot
	var y=370;
	var next_x=204;				// robot coordinates incremented
	var next_y=370;
	var c;					// click event
	var m;					// scaling for actual robot distance
	var startPosition = [0, 0];		// center of the front of the robot at beginning of route
	var lastPosition = [0, 0];		// center of the front of the robot at end of route
	var forwardDistance = 0;		//distance in feet robot should travel forward
	var distance = 0;
	var forwardTime = 10;		//duration of time in seconds robot should travel forward
	var time = 0;
	var angleTurnRight = 0;		//angle in degrees robot should turn clockwise
	var angle = 0;
	var interval;
	var ready = false;
	var driving = false;		//is robot driving?
	
drawField();
chooseStart();
//tryRoute();
//saveRoute();

function drawField()
	{	
		var canvas=document.getElementById('FieldCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = 0;
		ctx.fillStyle = 'F0F0F0';		//make field gray and therefore opaque so other canvases can be hidden
	    ctx.fillRect(0,0,screenWidth,screenHeight);

		//platform and scale
			ctx.beginPath();
				ctx.moveTo(113*k,20*k);		//start at corner of platform
				ctx.lineTo(246*k,20*k);		//go to far corner of platform
				ctx.stroke();
	
				ctx.moveTo(246*k,20*k);
				ctx.lineTo(246*k,58*k);		//to side of scale
				ctx.stroke();
				
				ctx.moveTo(246*k,58*k);
				ctx.lineTo(270*k,58*k);		//to front of scale
				ctx.stroke();
				
				ctx.moveTo(270*k,58*k);
				ctx.lineTo(270*k,106*k);	//to side of scale
				ctx.stroke();
				
				ctx.moveTo(270*k,106*k);
				ctx.lineTo(246*k,106*k);	//back to platform
				ctx.stroke();
				
				ctx.moveTo(246*k,106*k);
				ctx.lineTo(246*k,144*k);	//to corner of platform
				ctx.stroke();
				
				ctx.moveTo(246*k,144*k);
				ctx.lineTo(113*k,144*k);	//to third corner of platform
				ctx.stroke();
				
				ctx.moveTo(113*k,144*k);
				ctx.lineTo(113*k,106*k);	//to edge of other scale
				ctx.stroke();
				
				ctx.moveTo(113*k,106*k);
				ctx.lineTo(89*k,106*k);		//to front of scale
				ctx.stroke();
				
				ctx.moveTo(89*k,106*k);
				ctx.lineTo(89*k,58*k);		//to side of scale
				ctx.stroke();
				
				ctx.moveTo(89*k,58*k);
				ctx.lineTo(113*k,58*k);		//to edge of platform
				ctx.stroke();
				
				ctx.moveTo(113*k,58*k);
				ctx.lineTo(113*k,20*k);		//to back to corner of platform
				ctx.stroke();
		
		//outline of field			
			ctx.beginPath();
				ctx.moveTo(18*k,20*k);
				ctx.lineTo(18*k,370*k);		//edge of field
				ctx.stroke();
				
				ctx.moveTo(18*k,370*k);
				ctx.lineTo(48*k,406*k);		//to starting edge
				ctx.stroke();
				
				ctx.moveTo(48*k,406*k);
				ctx.lineTo(312*k,406*k);	//to far side of starting edge
				ctx.stroke();
				
				ctx.moveTo(312*k,406*k);
				ctx.lineTo(342*k,370*k);	//to far side of field
				ctx.stroke();
				
				ctx.moveTo(342*k,370*k);
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
  
function chooseStart()
	{
		var canvas=document.getElementById('StartCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;

		ctx.strokeStyle = "red";
	
		drawRobot(ctx, leftStart);
		drawRobot(ctx, centerStart);
		drawRobot(ctx, rightStart);
		
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
		//hide the robots in the three starting positions
		document.getElementById('StartCanvas').style.zIndex = -40;
		
		//get cursor position to see which robot was chosen
		startPosition = [c.pageX, c.pageY];
				
		//get robot canvas
		canvas=document.getElementById('RobotCanvas');
		ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		canvas.style.zIndex = 100;
		ctx.strokeStyle = "blue";

		// check if the cursor is in the left robot
 		if ((startPosition[0] >= (leftStart[0]-15.75)*k) && (startPosition[0] <= (leftStart[0]+15.75)*k) 
 			&& (startPosition[1] >= leftStart[1]*k) && (startPosition[1] <= (leftStart[1]+36)*k))
 				{
					startPosition = leftStart;
					ready = true;
		  		}
			
		// check if the cursor is in the center robot
 		if ((startPosition[0] >= (centerStart[0] - 15.75) * k) && (startPosition[0] <= (centerStart[0] + 15.75)*k) 
 				&& (startPosition[1] >= (centerStart[1])*k) && (startPosition[1] <= (centerStart[1]+36)*k))
 				{
					startPosition = centerStart;
					ready = true;
		  		}

		// check if the cursor is in the right robot
 		if ((startPosition[0] >= (rightStart[0] - 15.75) * k) && (startPosition[0] <= (rightStart[0] + 15.75)*k) 
 				&& (startPosition[1] >= (rightStart[1])*k) && (startPosition[1] <= (rightStart[1]+36)*k))
  				{
					startPosition = rightStart;
					ready = true;
		  		}
		  	if (ready)
		  		{
		  			drawRobot(ctx, startPosition);
		  			lastPosition = startPosition;
		  			ready = false;
		  			chooseRoute();
				}
	}

function chooseRoute()
	{
		canvas=document.getElementById("RouteCanvas");
		canvas.width=screenWidth;
		canvas.height=screenHeight;
		i=0;
		nextStep(i);
	}

function nextStep(i)
	{
		switch (i) {
   		case 0:
        		goForward(130);
       		break;
  		case 1:
        		turn(-90);
        		goForward (37);
       		break;
  		case 2:
        		goForward (-40);
       		break;
  		case 3:
        		turn(90);
        		goForward (70);
       		break;
  		case 4:
        		turn(-90);
        		goForward (48);
       		break;
	  	case 5:
        		turn(-90);
        		goForward (27);
       		break;
  		case 6:
        		goForward (-10);
       		break;
  		case 7:
        		turn (-90);
        		goForward (50)
       		break;
  		case 8:
        		turn (-90);
        		goForward(100);
       		break;
       	case 9:
        		turn (-90);
        		goForward(30);
       		break;
	

}
	}

function goForward(distance)
	{

		x=lastPosition[0];
		y=lastPosition[1];
		forwardDistance = distance;
		driving = true;

		interval=setInterval("drawRoute()",10);


		
//		document.getElementById('RouteCanvas').style.zIndex = 200;
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
		//			alert (i);
					clearInterval(interval);
					nextStep(i);
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
/*function displayRules()
	{
		// put a gray background behind the rules
		var canvas=document.getElementById('RulesCanvas');
		var ctx=canvas.getContext('2d');
		canvas.width=screenWidth;
		ctx.fillStyle = 'F0F0F0';
	    	ctx.fillRect(0,0,screenWidth,screenHeight);
		canvas.style.zIndex = 100;
		document.getElementById("rules").style.zIndex = 110;
		document.getElementById("playButton").style.zIndex = 200;
	}

function displayGame()
	{
		// hide rules
		document.getElementById("rules").style.zIndex = -20;
		document.getElementById("playButton").style.zIndex = -30;
		document.getElementById('RulesCanvas').style.zIndex = -40;

		// bring up background and black canvas
		var canvas=document.getElementById('BackgroundCanvas');
		var ctx=canvas.getContext('2d');
		canvas.style.zIndex = 100;

		canvas=document.getElementById('PaperCanvas');
		ctx=canvas.getContext('2d');
		canvas.style.zIndex = 110;
//		canvas.addEventListener("click", scratchOnClick, false);
//		canvas.addEventListener("dblclick", scratchOnDblClick, false);
		canvas.addEventListener("mousedown", scratchOnDown, false);
		canvas.addEventListener("mousemove", scratchOnMove, false);
		canvas.addEventListener("mouseup", scratchOnUp, false);
		canvas.addEventListener("touchstart", scratchOnTouchStart, false);
		canvas.addEventListener("touchmove", scratchOnTouchMove, false);
		canvas.addEventListener("touchend", scratchOnTouchEnd, false);
	}

function scratchOnTouchStart(c)
	{
		c.preventDefault(); 
		drag = true;			//start path
		canvas=document.getElementById('PaperCanvas');
		ctx=canvas.getContext('2d');
		
		var dot = getTouchPosition(c);
 		ctx.beginPath();
		ctx.moveTo(dot[0],dot[1]);
	}

function getTouchPosition(c)
	{
		x = c.touches[0].pageX;
		y = c.touches[0].pageY;
		  
		var dot = [x,y];
		return dot;
	}

function scratchOnDown(c)
	{
		drag = true;			//start path
		canvas=document.getElementById('PaperCanvas');
		ctx=canvas.getContext('2d');
		
		var dot = getCursorPosition(c);
 		ctx.beginPath();
		ctx.moveTo(dot[0],dot[1]);
	}

function scratchOnMove(c)
	{
		if (drag == true)
			{
				canvas=document.getElementById('PaperCanvas');
				ctx=canvas.getContext('2d');
				var dot = getCursorPosition(c);
				ctx.lineTo(dot[0],dot[1]);
   			 	ctx.strokeStyle = "blue";
  			  	ctx.lineWidth = 5;
  			  	ctx.stroke();
  			  	makeClear();
			}
	}

function scratchOnTouchMove(c)
	{
		c.preventDefault(); 
		if (drag == true)
			{
				canvas=document.getElementById('PaperCanvas');
				ctx=canvas.getContext('2d');
				var dot = getTouchPosition(c);
				ctx.lineTo(dot[0],dot[1]);
   			 	ctx.strokeStyle = "blue";
  			  	ctx.lineWidth = 5;
  			  	ctx.stroke();
  			  	makeClear();
			}
	}


function scratchOnUp(c)
	{
		drag = 0;		// end path
	}

function scratchOnTouchEnd(c)
	{
		c.preventDefault(); 
		drag = 0;		// end path
	}

function scratchOnClick(c)
	{
		canvas=document.getElementById('PaperCanvas');
		ctx=canvas.getContext('2d');

//		alert ("Ouch!");
		
		drag = true;		// start scratching
		size = 4;		// size of scraper
		drawDot(c);	
	}
	
function drawDot(c)
	{
		// draw a dot where the mouse clicked
		var dot = getCursorPosition(c);
		ctx.beginPath();
    	ctx.arc(dot[0], dot[1], size, 0, Math.PI*2, true);
   		ctx.closePath();
    	ctx.strokeStyle = "blue";
    	ctx.stroke();
    	ctx.fillStyle = "blue";
    	ctx.fill();
		makeClear();
	} 
	
function getCursorPosition(c)
	{
		var canvas=document.getElementById('PaperCanvas');
		var ctx=canvas.getContext('2d');
		
//	alert ("Curses!");
		
	  // Get the mouse position relative to the canvas element.
		if (c.layerX || c.layerX == 0) { // Firefox
		    x = c.layerX;
		    y = c.layerY;
		  } else if (c.offsetX || c.offsetX == 0) { // Opera
		    x = c.offsetX;
		    y = c.offsetY;
		  }
		var dot = [x,y];
		return dot;
	}
function scratchOnDblClick(c)
	{
		canvas=document.getElementById('PaperCanvas');
		ctx=canvas.getContext('2d');

		size = 10;
		drawDot(c);
	} */

/*function scratchOnDrag(c)
	{
		canvas=document.getElementById('PaperCanvas');
		ctx=canvas.getContext('2d');

		alert ("Whee!");

		// draw a dot where the mouse clicked
		var dot = getCursorPosition(c);
		ctx.beginPath();
    	ctx.arc(dot[0], dot[1], 10, 0, Math.PI*2, true);
   		ctx.closePath();
    	ctx.strokeStyle = "blue";
    	ctx.stroke();
    	ctx.fillStyle = "blue";
    	ctx.fill();
		makeClear();
	} */
	
/*function strokeSize()
	{
		
	}  */
	