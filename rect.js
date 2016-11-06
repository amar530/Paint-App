		
		function point(x_coordinate,   // a constructor for pointer object
			            y_coordinate) 
		{
			this.x=x_coordinate;
			this.y=y_coordinate;
		}
		
		/*define global veriable*/

		var starting_points=[];
		var ending_points=[];
		var new_starting_point=null;
		var new_ending_point=null;
		var pointer_position_x;
		var pointer_position_y;
		var new_rectangle_is_being_drawn=false;

		function on_mouse_down(event) { // the mouse and some other pointing device was pressed on canvas area.

			pointer_position_x;
			pointer_position_y;

			if (event.offsetX && event.offsetY) 
			{
				pointer_position_x=event.offsetX;
				pointer_position_y=event.offsetY;


			}
			else if (event.clientX && event.clientY)    /*for firefox browser*/
			{
				 var canvas=event.target;
				 pointer_position_x=event.clientX-canvas.offsetLeft;
				 pointer_position_y=event.clientY-canvas.offseTop;

			}

			new_starting_point=new point(pointer_position_x,  pointer_position_y);

			new_rectangle_is_being_drawn=true;

			draw_on_canvas();

		}

		function on_mouse_move(event) 
		{
			if (new_rectangle_is_being_drawn==true) 
			{
				pointer_position_x,pointer_position_y;
				if (event.offsetX && event.offsetY) 
				{
					pointer_position_x=event.offsetX;
					pointer_position_y=event.offsetY;
				}
				else if (event.clientX && event.clientY) 
			    {
				 var canvas=event.target;
				 pointer_position_x=event.clientX-canvas.offsetLeft;
				 pointer_position_y=event.clientY-canvas.offseTop;

			    }

			    new_ending_point=new point(pointer_position_x,pointer_position_y);
			    draw_on_canvas();
			}
		}

		function on_mouse_up(event) 
		{
			if (new_rectangle_is_being_drawn==true) 
			{
			     pointer_position_x,pointer_position_y;
				if (event.offsetX && event.offsetY) 
				{
					pointer_position_x=event.offsetX;
					pointer_position_y=event.offsetY;
				}
				else if (event.clientX && event.clientY) 
			    {
				 var canvas=event.target;
				 pointer_position_x=event.clientX-canvas.offsetLeft;
				 pointer_position_y=event.clientY-canvas.offseTop;
			    }


			    starting_points.push(new_starting_point);// the drawing is newline is finished now 
			    										 // the start and end point of the newline will be pushed
			    										 // to the end of the array.

			    ending_points.push(new point(pointer_position_x,pointer_position_y));

			    new_rectangle_is_being_drawn=false;
			    new_starting_point=null;
			    new_ending_point=null;
			    draw_on_canvas();
			}
		}

		function draw_filled_rectangle(given_context,starting_point,ending_point,filling_color)  /* */
		{
			var upper_left_corner_x=starting_point.x;
			var upper_left_corner_y=starting_point.y;
			var rectangle_width=ending_point.x-starting_point.x;
			var rectangle_height=ending_point.y-starting_point.y;
		
		if (rectangle_width<0)
		 {
		 	rectangle_width=-rectangle_width;
		 	upper_left_corner_x-=rectangle_width;
		 }
		 if (rectangle_height<0) 
		 {
		 	rectangle_height=-rectangle_height;
		 	upper_left_corner_y-=rectangle_height;
		 }
		 given_context.save();
		 given_context.fillStyle=filling_color;
		 given_context.strokeStyle="black";
		 given_context.lineWidth=2;/**/
		 given_context.fillRect(upper_left_corner_x,upper_left_corner_y,rectangle_width,rectangle_height);

		 given_context.strokeRect(upper_left_corner_x,upper_left_corner_y,rectangle_width,rectangle_height);

		 given_context.restore();
		}

		function draw_on_canvas() 
		{
			var canvas=document.getElementById("drawing_rectangles_canvas"); /**/
			var context=canvas.getContext("2d"); 
			context.fillStyle="Beige";
			context.fillRect(0,0,canvas.width,canvas.height);
			var rectangle_colors=[" #abebc6 "," #af601a ",
								  " #641e16 "," #8e44ad ",  // array of colors.
			                      " #f1c40f "," #fef5e7 ",
			                      "#1741d1","#be7488",
			                      " #5f6a6a","#8a1c2e"];
			
			for (var rectangle_index = 0;
			         rectangle_index < starting_points.length; // all rectangles will be drawn.
			         rectangle_index++) 
			{
				var color_from_list=rectangle_colors.pop(); //pop remove and return the last color of the array

				draw_filled_rectangle(context,starting_points[rectangle_index],ending_points[rectangle_index],color_from_list);

				rectangle_colors.unshift(color_from_list);//unshift puts to use color begining of the array
				                                          //in this way color will be used again after all other colors 
				                                          // have been used.
			}
			if (new_ending_point!=null)// will be drawn not yet finish rectangle.
			 {
			 	draw_filled_rectangle(context,new_ending_point,new_ending_point,"snow"); // almost white rectangle 
			 	                                                                         //until and unless mouse is removed
			 }
		}
	
	