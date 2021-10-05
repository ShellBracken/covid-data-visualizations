var attrib1 = "CASE_COUNT";

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

svg
  .append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 10)
  .attr("y", 10)
  .attr("font-size", "24px")
  .text("Covid Data Histogram");

// get the data
d3.csv("data/covid.csv").then(function (data) {
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

  // X axis: scale and draw:
  const x = d3
    .scaleLinear()
    .domain([
      d3.min(data, function (d) {
        return +d[attrib1];
      }),
      d3.max(data, function (d) {
        return +d[attrib1];
      }),
    ]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .append("text")
    .attr("y", 25)
    .attr("x", 200)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text(attrib1);

  // set the parameters for the histogram
  const histogram = d3
    .histogram()
    .value(function (d) {
      return d[attrib1];
    }) // I need to give the vector of value
    .domain(x.domain()) // then the domain of the graphic
    .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  const bins = histogram(data);

  // Y axis: scale and draw:
  const y = d3.scaleLinear().range([height, 0]);
  y.domain([
    0,
    d3.max(bins, function (d) {
      return d.length;
    }),
  ]); // d3.hist has to be called before the Y axis obviously
  svg.append("g").call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", 1)
    .attr("transform", function (d) {
      return `translate(${x(d.x0)} , ${y(d.length)})`;
    })
    .attr("width", function (d) {
      return x(d.x1) - x(d.x0) - 1;
    })
    .attr("height", function (d) {
      return height - y(d.length);
    })
    .style("fill", "#69b3a2");

  // A function that update the chart
  function update(selectedGroup) {
    attrib1 = selectedGroup;
    d3.select("svg").remove();

    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 10)
      .attr("y", 10)
      .attr("font-size", "24px")
      .text("Covid Data Histogram");

    // X axis: scale and draw:
    const x = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return +d[attrib1];
        }),
        d3.max(data, function (d) {
          return +d[attrib1];
        }),
      ]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("y", 25)
      .attr("x", 200)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(attrib1);

    // set the parameters for the histogram
    const histogram = d3
      .histogram()
      .value(function (d) {
        return d[attrib1];
      }) // I need to give the vector of value
      .domain(x.domain()) // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

    // And apply this function to data to get the bins
    const bins = histogram(data);

    // Y axis: scale and draw:
    const y = d3.scaleLinear().range([height, 0]);
    y.domain([
      0,
      d3.max(bins, function (d) {
        return d.length;
      }),
    ]); // d3.hist has to be called before the Y axis obviously
    svg.append("g").call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg
      .selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("x", 1)
      .attr("transform", function (d) {
        return `translate(${x(d.x0)} , ${y(d.length)})`;
      })
      .attr("width", function (d) {
        return x(d.x1) - x(d.x0) - 1;
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      .style("fill", "#69b3a2");
  }

  // When button 1 is changed, run the updateChart function
  d3.select("#selectButton1").on("change", function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value");
    // run the updateChart function with this selected option
    update(selectedOption);
  });
});
