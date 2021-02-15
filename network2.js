async function networkChart() {

    const data = await d3.json("./test.json")
    // console.log(data)

    const height = 700
    const width = 700

    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));
  
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id(d => d.id)
            .distance(10))
        .force("charge", d3.forceManyBody().strength(-20))
        //.force('collision', d3.forceCollide().radius(0.1))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("center", d3.forceCenter());
  
    const svg = d3.select("#svg")
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])

    const usa = nodes.filter(d => d.label == "UNITED STATES")
        console.log(usa)
    const russia = nodes.filter(d => d.label == "RUSSIA")
   
    const link = svg.append("g")
        .attr("stroke", "#c7956d")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 0.4)
        .attr("stroke-opacity", 0.3);

    // Define the div for the tooltip
    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 1)
        .style("display", 'inline')
        .style("color", "#7C7C7E")
        .style("font-size","14px");

    const node = svg.append("g")
        // .attr("stroke", "#a72461")
        // .attr("stroke-width", 0.1)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 0.9)
        // .attr("fill", "#f2d974")
        .attr("fill", function(d){
            if (d.label == "UNITED STATES") {return "#8d93ab"}
            else if (d.label == "RUSSIA") {return "red"}
            else {return "#f2d974"}; 
        })
        .attr("fill-opacity", 0.7)
        .on("mouseover", function(event, d){
            console.log(d);
            div.transition()
            .duration(200)
            .style("opacity", 1);
            div.html(d.id)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");

        })
        .on("mouseout", function(d){
          div.transition()
          .duration(500)
          .style("opacity", 0);
        });
        
    node.append("title")
        .text(d => d.id);

    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
    });

  }
  networkChart()
