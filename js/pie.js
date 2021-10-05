d3.csv("data/covid.csv").then(function (data) {
  var attrib1 = "CASE_COUNT";
  var data2 = {};
  var bins2 = [];
  var min = 0;
  var max = 0;
  var cause = [];

  var nodate = data.columns.splice(0, 1);
  // add the options to button 1
  d3.select("#selectButton1")
    .selectAll("myOptions")
    .data(data.columns)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    }) // text showed in the menu
    .attr("value", function (d) {
      return d;
    });

  data.map(function (d) {
    cause.push(d[attrib1]);
  });
  var histGenerator = d3
    .bin()
    .domain([0, Math.max.apply(Math, cause)]) // Set the domain to cover the entire intervall [0;]
    .thresholds(19); // number of thresholds; this will create 19+1 bins

  var bins = histGenerator(cause);
  bins.sort(function (a, b) {
    return b.length - a.length;
  });
  bins2.push(bins[0]);
  bins.splice(0, 1);
  bins2.push(bins[0]);
  bins.splice(0, 1);
  bins2.push(bins[0]);
  bins.splice(0, 1);
  bins2.push(bins[0]);
  bins.splice(0, 1);
  bins2.push(bins[0]);
  bins.splice(0, 1);
  var merged = [].concat.apply([], bins);
  bins2.push(merged);
  for (var i = 0; i < bins2.length; i++) {
    min = Math.min.apply(Math, bins2[i]);
    max = Math.max.apply(Math, bins2[i]);
    var key = min + " - " + max;
    var val = bins2[i].length;
    data2[key] = val;
  }

  // A function that create / update the plot for a given variable:
  function update(data) {
    // set the color scale
    const color = d3
      .scaleOrdinal()
      .domain(["a", "b", "c", "d", "e", "f"])
      .range(d3.schemeDark2);

    // set the dimensions and margins of the graph
    const width = 450,
      height = 450,
      margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    svg
      .append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", -200)
      .attr("y", -200)
      .attr("font-size", "24px")
      .text(attrib1);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .value(function (d) {
        return d[1];
      })
      .sort(function (a, b) {
        return d3.ascending(a.key, b.key);
      }); // This make sure that group order remains the same in the pie chart
    const data_ready = pie(Object.entries(data));

    // map to data
    const u = svg.selectAll("path").data(data_ready);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u.join("path")
      .transition()
      .duration(1000)
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", function (d) {
        return color(d.data[0]);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1);

    // shape helper to build arcs:
    var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    }

    u.enter()
      .append("text")
      .text(function (d) {
        console.log(getKeyByValue(data, d.value));
        return getKeyByValue(data, d.value);
      })
      .attr("transform", function (d) {
        return "translate(" + arcGenerator.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 17);
  }

  // Initialize the plot with the first dataset
  update(data2);

  // When button 1 is changed, run the updateChart function
  d3.select("#selectButton1").on("change", function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value");
    attrib1 = selectedOption;
    // run the updateChart function with this selected option
    d3.select("svg").remove();

    var data2 = {};
    var bins2 = [];
    var min = 0;
    var max = 0;
    var cause = [];
    data.map(function (d) {
      cause.push(d[selectedOption]);
    });
    var histGenerator = d3
      .bin()
      .domain([0, Math.max.apply(Math, cause)]) // Set the domain to cover the entire intervall [0;]
      .thresholds(19); // number of thresholds; this will create 19+1 bins

    var bins = histGenerator(cause);
    bins.sort(function (a, b) {
      return b.length - a.length;
    });
    console.log(bins);
    bins2.push(bins[0]);
    bins.splice(0, 1);
    bins2.push(bins[0]);
    bins.splice(0, 1);
    bins2.push(bins[0]);
    bins.splice(0, 1);
    bins2.push(bins[0]);
    bins.splice(0, 1);
    bins2.push(bins[0]);
    bins.splice(0, 1);
    var merged = [].concat.apply([], bins);
    bins2.push(merged);
    bins2 = bins2.filter(function(e) { 
        return e.length;
      });
    for (var i = 0; i < bins2.length; i++) {
      min = Math.min.apply(Math, bins2[i]);
      max = Math.max.apply(Math, bins2[i]);
      var key = min + " - " + max;
      var val = bins2[i].length;
      data2[key] = val;
    }

    update(data2);
  });
});
