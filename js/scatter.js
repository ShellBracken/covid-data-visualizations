var isy = 0;
var attrib1 = "CASE_COUNT";
var attrib2 = "Total Individuals in Shelter";

const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 560 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

svg
  .append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 10)
  .attr("y", 10)
  .attr("font-size", "24px")
  .text("Covid Data Comparison");

//Read the data
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

  // add the options to button 2
  d3.select("#selectButton2")
    .selectAll("myOptions")
    .data(data.columns)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    }) // text showed in the menu
    .attr("value", function (d) {
      return d;
    })
    .property("selected", function(d){ return d === attrib2; })
    ;


  // Add X axis
  const x = d3
    .scaleLinear()
    .domain([
      d3.min(data, function (d) {
        return d[attrib1];
      }),
      d3.max(data, function (d) {
        return d[attrib1];
      }),
    ])
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

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([
      d3.min(data, function (d) {
        return d[attrib2];
      }),
      d3.max(data, function (d) {
        return d[attrib2];
      }),
    ])
    .range([height, 0]);
  svg
    .append("g")
    .call(
      d3
        .axisLeft(y)
        .tickFormat(function (d) {
          return d;
        })
        .ticks(10)
    )
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text(attrib2);

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", function (d) {
      return x(d[attrib1]);
    })
    .attr("cy", function (d) {
      return y(d[attrib2]);
    })
    .attr("r", 1.5)
    .style("fill", "red");

  // A function that update the chart
  function updatex(selectedGroup) {
    attrib1 = selectedGroup;
    d3.select("svg").remove();
    // append the svg object to the body of the page
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg
      .append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 10)
      .attr("y", 10)
      .attr("font-size", "24px")
      .text("Covid Data Comparison");

    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d[attrib1];
        }),
        d3.max(data, function (d) {
          return d[attrib1];
        }),
      ])
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

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d[attrib2];
        }),
        d3.max(data, function (d) {
          return d[attrib2];
        }),
      ])
      .range([height, 0]);
    svg
      .append("g")
      .call(
        d3
          .axisLeft(y)
          .tickFormat(function (d) {
            return d;
          })
          .ticks(10)
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(attrib2);

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x(d[attrib1]);
      })
      .attr("cy", function (d) {
        return y(d[attrib2]);
      })
      .attr("r", 1.5)
      .style("fill", "red");
  }

  // A function that update the chart
  function updatey(selectedGroup) {
    attrib2 = selectedGroup;
    d3.select("svg").remove();
    // append the svg object to the body of the page
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg
      .append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 10)
      .attr("y", 10)
      .attr("font-size", "24px")
      .text("Covid Data Comparison");

    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d[attrib1];
        }),
        d3.max(data, function (d) {
          return d[attrib1];
        }),
      ])
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

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d[attrib2];
        }),
        d3.max(data, function (d) {
          return d[attrib2];
        }),
      ])
      .range([height, 0]);
    svg
      .append("g")
      .call(
        d3
          .axisLeft(y)
          .tickFormat(function (d) {
            return d;
          })
          .ticks(10)
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(attrib2);

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x(d[attrib1]);
      })
      .attr("cy", function (d) {
        return y(d[attrib2]);
      })
      .attr("r", 1.5)
      .style("fill", "red");
  }

  // When button 1 is changed, run the updateChart function
  d3.select("#selectButton1").on("change", function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value");
    // run the updateChart function with this selected option
    if (isy == 0) {
      updatex(selectedOption);
    } else {
      updatey(selectedOption);
    }
  });

  // When button 2 is changed, run the updateChart function
  d3.select("#selectButton2").on("change", function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value");
    // run the updateChart function with this selected option
    if (isy == 0) {
      updatey(selectedOption);
    } else {
      updatex(selectedOption);
    }
  });

  d3.select("#xy").on("change", function (d) {
    if (isy == 0) {
      isy = 1;
    } else {
      isy = 0;
    }

    var selectedOption = d3.select("#selectButton1").property("value");
    // run the updateChart function with this selected option
    if (isy == 0) {
      updatex(selectedOption);
    } else {
      updatey(selectedOption);
    }

    var selectedOption = d3.select("#selectButton2").property("value");
    // run the updateChart function with this selected option
    if (isy == 0) {
      updatey(selectedOption);
    } else {
      updatex(selectedOption);
    }
  });
});
