////////////////////////////////////////////
// Slide - Map - Regional comparison
// This is just an example to start from
// when developing new timeseries charts
// in this project
///////////////////////////////////////////
var json_data;
var map;

// Find the window dimensions

function drawMap(collection) {
json_data = collection;

// Center & Scale the map vis (http://bl.ocks.org/mbostock/4707858)
// - Create a unit projection.
var projection = d3.geo.albers()
    .scale(1)
    .translate([0, 0]);

// - Create a path generator.
var path = d3.geo.path()
    .projection(projection);

// - Compute the bounds of a feature of interest, then derive scale & translate.
var b = path.bounds(collection.features[0]),
    s = '.95' / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

// - Update the projection to use computed scale & translate.
projection
    .scale(s)
    .translate(t);

    //var svg = d3.select("svg");
    var group = map.append('g');
    
    group.selectAll("path")
    .data(collection.features)
        .enter().append("path")
            .attr("d", path)
            .style("fill", 'black');
            
    // Quick examples of how to add idicators to the map vis
    var pacific = projection(['-130', '55']);
    group.append('circle')
    .attr('cx', pacific[0])
    .attr('cy', pacific[1])
    .attr('r', 20)
    .attr('id', 'pacific')
    .style('fill', 'red');

    var atlantic = projection(['-60', '50']);
    group.append('circle')
    .attr('cx', atlantic[0])
    .attr('cy', atlantic[1])
    .attr('r', 50)
    .attr('id', 'atlantic')
    .style('fill', 'none')
    .style('stroke', 'red')
    .style('stroke-width', '4');
}
