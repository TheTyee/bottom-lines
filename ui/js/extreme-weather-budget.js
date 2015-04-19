////////////////////////////////////////////
// Card - Economy - Extreme weather budget
///////////////////////////////////////////

// Make the data avaialble to the console
var csv_data;

// Find the window dimensions
var margins = {top: 30, right: 20, bottom: 30, left: 70};
var width = parseInt(d3.select("#extreme-weather-budget-datavis").style("width"));
height = parseInt(d3.select("#extreme-weather-budget-datavis").style("height"));

// Setup container & chart dimensions
var container_dimensions = {width: width, height: height},
chart_dimensions = {
    width: container_dimensions.width - margins.left - margins.right,
    height: container_dimensions.height - margins.top - margins.bottom
};

// Setup SVG
var chart = d3.select("#extreme-weather-budget-datavis")
.append("svg")
.attr("width", container_dimensions.width)
.attr("height", container_dimensions.height)
.append("g")
.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
.attr("id","chart");

// Variables for scales & axis
var time_scale, percent_scale;
var time_axis, count_axis;


function draw(data) {
    // Make the data avaialble to the console
    csv_data = data;

    // Get the extent of the data
    var years = d3.extent(data, function(d) { return d.year; });
    var loses = d3.extent(data, function(d) { return d.loses; });

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
    .domain([loses[0]-100,loses[1]+10]);

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
    .text("Total estimated loses")
    .attr("x", -chart_dimensions.height/3)
    .attr("y", -60)
    .attr("transform", "rotate(-90)");

    // Create lines for the loss values
    var line = d3.svg.line()
    .x(function(d){ return time_scale(d.year); })
    .y(function(d){ return percent_scale(d.loses); })
    .interpolate("linear");

    // Add a group for the lines
    var lines = d3.select("#chart")
    .append("g");
    lines.append("path")
    .attr("class", "line")
    .attr("id", "loses")
    .attr("d", line(data));

    // Add a group for the circles
    var circles = d3.select("#chart");
    circles.append("g");
    // Add points to line
    circles.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return time_scale( d.year ); })
    .attr("cy", function(d) { return percent_scale( d.loses ); })
    .attr("r",0)
    .attr("class", "circle");

    // Add mouse overs & transitions
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


    chart.selectAll("circle")
    .on("mouseover.tooltip", function(d){
        d3.select("text#loses").remove();
        d3.select("#chart")
        .append("text")
        .text("$" + FormatNumberBy3(d.loses, ".",",") + " (" + d.year.getFullYear() + ")")
        .attr("x", time_scale(d.year) + 30)
        .attr("y", percent_scale(d.loses) - 15)
        .attr("id", "loses");
    });
    chart.selectAll("circle")
    .on("mouseout.tooltip", function(d){
        d3.select("text#loses")
        .transition()
        .duration(500)
        .style("opacity",0)
        .remove();
    });

    // Responsive function
    // When the window changes size, re-calcuate the scales & re-draw
    function resize() {
        // Find the new window dimensions
        width = parseInt(d3.select("#extreme-weather-budget-datavis").style("width"));
        height = parseInt(d3.select("#extreme-weather-budget-datavis").style("height"));

        // Update the container & chart dimensions
        container_dimensions.width = width;
        container_dimensions.height = height;
        chart_dimensions.width = container_dimensions.width - margins.left - margins.right;
        chart_dimensions.height = container_dimensions.height - margins.top - margins.bottom;
        // Resize the SVG
        svg = d3.select("#extreme-weather-budget-datavis svg");
        svg.attr("width", container_dimensions.width)
            .attr("height", container_dimensions.height);

        // Updates the range & scales
        time_scale = d3.time.scale()
            .range([0,chart_dimensions.width])
            .domain([low_year,high_year]);
        percent_scale = d3.scale.linear()
            .range([chart_dimensions.height, 0])
            .domain([loses[0]-100,loses[1]+10]);

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
            .attr("cx", function(d) { return time_scale( d.year ); })
            .attr("cy", function(d) { return percent_scale( d.loses ); });
    }
    d3.select(window).on('resize', resize);


}

d3.csv("/data/loses.csv", function(d) {
    return {
        year: new Date(+d.year, 0, 1), // convert "year" column to Date
        loses: +d.loses,
    };
}, draw );

function FormatNumberBy3(num, decpoint, sep) {
    // check for missing parameters and use defaults if so
    if (arguments.length == 2) {
        sep = ",";
    }
    if (arguments.length == 1) {
        sep = ",";
        decpoint = ".";
    }
    // need a string for operations
    num = num.toString();
    // separate the whole number and the fraction if possible
    a = num.split(decpoint);
    x = a[0]; // decimal
    y = a[1]; // fraction
    z = "";


    if (typeof(x) != "undefined") {
        // reverse the digits. regexp works from left to right.
        for (i = x.length - 1; i >= 0; i--)
        z += x.charAt(i);
        // add seperators. but undo the trailing one, if there
        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
        z = z.slice(0, -sep.length);
        x = "";
        // reverse again to get back the number
        for (i = z.length - 1; i >= 0; i--)
        x += z.charAt(i);
        // add the fraction back in, if it was there
        if (typeof(y) != "undefined" && y.length > 0)
        x += decpoint + y;
    }
    return x;
}
