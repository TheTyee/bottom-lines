////////////////////////////////////////////
// Slide - Chart - Timeseries
// This is just an example to start from
// when developing new timeseries charts
// in this project
///////////////////////////////////////////
var csv_data;

// Find the window dimensions
var margins = {top: 10, right: 80, bottom: 60, left: 60};
var width = parseInt(d3.select("#datavis").style("width"));
height = parseInt(d3.select("#datavis").style("height"));

// Setup container & chart dimensions
var container_dimensions = {width: width, height: height},
chart_dimensions = {
	width: container_dimensions.width - margins.left - margins.right,
	height: container_dimensions.height - margins.top - margins.bottom
};

// Setup SVG
var chart = d3.select("#datavis")
    .append("svg")
        .attr("width", container_dimensions.width)
        .attr("height", container_dimensions.height)
        .append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
        .attr("id","chart");

// Variables for scales & axis
var time_scale, percent_scale;
var time_axis, count_axis;

// Draw function
function draw(data) {
	// Make the data avaialble to the console
	csv_data = data;
	// Get the extend of the data	
        var years = d3.extent(data, function(d) { return d.year });
        var ghgs = d3.extent(data, function(d) { return d.ghgs });

	// Muck with dates
	var low_year = new Date ( years[0] );
	var high_year = new Date ( years[1] );
	low_year = low_year.setDate( low_year.getDate() - 365 );
	high_year = high_year.setDate( high_year.getDate() + 365 );

	// Setup the scales
	time_scale = d3.time.scale()
            .range([0,chart_dimensions.width])
            .domain([low_year,high_year]);
	percent_scale = d3.scale.linear()
            .range([chart_dimensions.height, 0])
            .domain([ghgs[0]-50,ghgs[1]+10]);

	// Setup axis
	time_axis = d3.svg.axis()
            .scale(time_scale);
	count_axis = d3.svg.axis()
            .scale(percent_scale)
            .orient("left");

        time_axis.ticks(Math.max(chart_dimensions.height/50, 2));
        count_axis.ticks(Math.max(chart_dimensions.width/50, 2));

	// Add the time axis
	chart.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + chart_dimensions.height + ")")
	.call(time_axis);
	// Add the percent axis
	chart.append("g")
	.attr("class", "y axis")
	.call(count_axis);

	// Axis labels
	// Add the y label
	d3.select(".y.axis")
	.append("text")
	.attr("text-anchor","middle")
	.text("GHGs")
	.attr("x", -chart_dimensions.height/2)
	.attr("y", -40)
	.attr("transform", "rotate(-90)");

	// Create lines for the values
	var line = d3.svg.line()
            .x(function(d){return time_scale(d.year)})
            .y(function(d){return percent_scale(d.ghgs)})
            .interpolate("linear");	

	// Add a group for the lines
	var g = d3.select("#chart")
	.append("g")
	g.append("path")
	.attr("class", "line")
	.attr("id", "ghgs")
	.attr("d", line(data));

	var g = d3.select("#chart")
	.append("g");
	// Add points to line
	g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function(d) {return time_scale( d.year )})
                .attr("cy", function(d) {return percent_scale( d.ghgs )})
                .attr("r",0)
                .attr("class", "circle");

	// Add mouse overs & transitions (GHCs)
	chart.selectAll("circle")
	.on("mouseover", function(d){
		d3.select(this)
		.transition()
		.attr("r",12);
	})
	.on("mouseout", function(d){
		d3.select(this)
		.transition()
		.attr("r",5);
	});
	var enter_duration = 2000;
	chart.selectAll("circle")
	.transition()
	.delay(function(d, i) { return i / data.length * enter_duration; })
	.attr("r", 5);


	g.selectAll("circle")
	.on("mouseover.tooltip", function(d){
		d3.select("text#ghgs").remove();
		d3.select("#chart")
		.append("text")
		.text(d.ghgs + "TK")
		.attr("x", time_scale(d.year) + 15)
		.attr("y", percent_scale(d.ghgs) - 15)
		.attr("id", "ghgs");

	});
	g.selectAll("circle")
	.on("mouseout.tooltip", function(d){
		d3.select("text#ghgs")
		.transition()
		.duration(500)
		.style("opacity",0)
		.remove();
	});

	// Responsive function
	// When the window changes size, re-calcuate the scales & re-draw
	function resize() {
                // Find the new window dimensions
                width = parseInt(d3.select("#datavis").style("width"));
                height = parseInt(d3.select("#datavis").style("height"));

                // Update the container & chart dimensions
                container_dimensions.width = width;
                container_dimensions.height = height;
                chart_dimensions.width = container_dimensions.width - margins.left - margins.right;
                chart_dimensions.height = container_dimensions.height - margins.top - margins.bottom;
                // Resize the SVG 
                svg = d3.select("#datavis svg");
                svg.attr("width", container_dimensions.width)
                .attr("height", container_dimensions.height);

                // Updates the range & scales
                time_scale = d3.time.scale()
                    .range([0,chart_dimensions.width])
                    .domain([low_year,high_year]);
                percent_scale = d3.scale.linear()
                    .range([chart_dimensions.height, 0])
                    .domain([ghgs[0]-50,ghgs[1]+10]);

            // Setup axis
            time_axis = d3.svg.axis()
                .scale(time_scale);
            count_axis = d3.svg.axis()
                .scale(percent_scale)
                .orient("left");

                time_axis.ticks(Math.max(chart_dimensions.height/50, 2));
                count_axis.ticks(Math.max(chart_dimensions.width/50, 2));

		// Update the axis with the new scale
                chart.select('.x.axis')
                .attr("transform", "translate(0," + chart_dimensions.height + ")")
                .call(time_axis);

                chart.select('.y.axis')
                .call(count_axis);

                chart.selectAll('.line')
                .datum(data)
                .attr("d", line);

                chart.selectAll('.circle')
                .data(data)
                .attr("cx", function(d) {return time_scale( d.year )})
                .attr("cy", function(d) {return percent_scale( d.ghgs )});

                
	}
	d3.select(window).on('resize', resize);
};


d3.csv("/data/data.csv", function(d) {
	return {
		year: new Date(+d.Year, 0, 1), // convert "Year" column to Date
		ghgs: +d.GHGs,
		pop: +d.Population,
		kyoto: +d.Kyoto
	};
}, draw );
