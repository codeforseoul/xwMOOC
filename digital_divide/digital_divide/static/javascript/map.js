/**
 * Created by Andrei Alikov on 3/7/15.
 */

var width = 1280,
    height = 1920;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("static/topojson/skorea-municipalities-topo.json", function(error, kor) {
    if (error) return console.error(error);

    var projection = d3.geo.mercator()
        .center([kor.transform.translate[0] + 3, kor.transform.translate[1] + 1.1])
        .scale(10000)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path().projection(projection);

    svg.selectAll(".subunit")
        .data(topojson.feature(kor, kor.objects['skorea-municipalities-geo']).features)
        .enter().append("path")
        .attr("class", function(d) { return "province province-" + d.properties.NAME_1; })
        .attr("d", path);

    svg.append("path")
        .datum(topojson.mesh(kor, kor.objects['skorea-municipalities-geo'], function(a, b) { return a !== b }))
        .attr("d", path)
        .attr("class", "subunit-boundary");

    svg.selectAll(".subunit-label")
        .data(topojson.feature(kor, kor.objects['skorea-municipalities-geo']).features)
        .enter().append("text")
        .attr("class", function(d) { return "subunit-label " + d.id; })
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) {
            if (d.properties.hasOwnProperty("NAME_2")) {
                return d.properties.NAME_2;
            }
            return d.properties.NAME_1;
        });
});