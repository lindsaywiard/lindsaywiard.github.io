async function mtMap() {
    
    let margin = {top: 15, right: 10, bottom: 10, left: 10};
    let width = 800 - margin.left - margin.right;
    let height = 550  - margin.top - margin.bottom;
    
    let svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Load in GeoJSON data
    let parks = await d3.json("parks.geojson");
    let counties = await d3.json("counties.geojson");
    let dem_counties = ['Big Horn County', 'Blaine County', 'Deer Lodge County', 'Glacier County', 'Missoula County', 'Silver Bow County', 'Gallatin County']

    projection = d3.geoMercator().fitSize([width, height], counties);

    // This converts the projected lat/lon coordinates into an SVG path string
    let path = d3.geoPath().projection(projection);
    
    d3.select("#countyLayer").selectAll("path")
        .data(counties.features.filter(d => d.geometry.type == "Polygon"))
        .join("path")
        .attr("d", path)
        .style("fill", function(d) {
            if (dem_counties.includes(d.properties.name)) 
            {return '#096CB3'}
            else {return '#BA3E38'}});
    
    d3.select("#parkLayer").selectAll("circle")
        .data(parks.features.filter(d => d.geometry.type == "Point"))
        .join("circle")
        .attr("cx",  d => projection(d.geometry.coordinates)[0])
        .attr("cy",  d => projection(d.geometry.coordinates)[1])
        .attr("r", 1.5)
        .style("fill", "white")
        .style("stroke", "white")
        .style("opacity", 0.7);

    d3.select("#parkLayer").selectAll("path")
        .data(parks.features.filter(d => d.geometry.type != "Point"))
        .join("path")
        .attr("d", path)
        .attr("stroke-opacity", 0.7)
        .style("stroke", "white")
        .style("stroke-width", "3px")
        .style("stroke-opacity", 0.7);

    // svg.append("text")
    //     .attr("x", (width / 2))
    //     .attr("y", margin.top)
    //     .attr("text-anchor","middle")
    //     .attr("font-family", "calibri")
    //     .attr("font-weight", "bold")
    //     .attr("font-size", "25px")
    //     .attr("fill", "#757270")
    //     .text("Montana Parks");
    
    var legend = svg.append("g")
        .attr("font-family", "calibri");

    legend.append("rect")
        .attr("x", width/2.45)
        .attr("y", height - height/4.6)
        .attr("width", width - width/2.45- margin.right)
        .attr("height", height/11)
        .attr("fill", "#757270")
        .attr("opacity", "0.7");

    legend.append("text")
        .attr("x", 1.4*width/2.45)
        .attr("y", height - height/4.6 + 16)
        .attr("text-anchor","start")
        .attr("font-family", "calibri")
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        // .attr("text-decoration", "underline")
        .attr("fill", "#ebe6e3")
        .text("2020 Presidential Election Results by County: ");

    legend.append("text")
        .attr("x", 1.15*width/2.45)
        .attr("y", height - height/4.6 + 16)
        .attr("text-anchor","start")
        .attr("font-family", "calibri")
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        // .attr("text-decoration", "underline")
        .attr("fill", "#ebe6e3")
        .text("Parks: ");

    legend.append("circle")
        .attr("cx", 1.2*width/2.45)
        .attr("cy", height - height/4.6 + 30.75)
        .attr("r", 3)
        .style("fill", "white")
        .style("stroke", "white")
        .style("opacity", 0.7);
    
    legend.append("text")
        .attr("x", 1.58*width/2.45)
        .attr("y", height - height/4.6 + 35)
        .attr("text-anchor","start")
        .attr("font-family", "calibri")
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        // .attr("text-decoration", "underline")
        .attr("fill", "#096CB3")
        .text("Democrat");

    legend.append("text")
        .attr("x", 1.89*width/2.45)
        .attr("y", height - height/4.6 + 35)
        .attr("text-anchor","start")
        .attr("font-family", "calibri")
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        // .attr("text-decoration", "underline")
        .attr("fill", "#BA3E38")
        .text("Republican");

    legend.append("rect")
        .attr("x", 1.84*width/2.45)
        .attr("y", height - height/4.6 + 27)
        .attr("width", 8)
        .attr("height", 8)
        .attr("fill", "#BA3E38");

    legend.append("rect")
        .attr("x", 1.53*width/2.45)
        .attr("y", height - height/4.6 + 27)
        .attr("width", 8)
        .attr("height", 8)
        .attr("fill", "#096CB3");
}
mtMap();