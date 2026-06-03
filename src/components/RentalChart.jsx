import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export const RentalChart = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Downtown");
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, title: "", value: "" });

  const data = {
    Downtown: [
      { quarter: "Q1 2025", price: 1850 },
      { quarter: "Q2 2025", price: 1900 },
      { quarter: "Q3 2025", price: 1980 },
      { quarter: "Q4 2025", price: 2050 },
      { quarter: "Q1 2026", price: 2100 },
      { quarter: "Q2 2026", price: 2250 },
    ],
    "West Mountain": [
      { quarter: "Q1 2025", price: 1600 },
      { quarter: "Q2 2025", price: 1650 },
      { quarter: "Q3 2025", price: 1680 },
      { quarter: "Q4 2025", price: 1720 },
      { quarter: "Q1 2026", price: 1750 },
      { quarter: "Q2 2026", price: 1800 },
    ],
    StoneyCreek: [
      { quarter: "Q1 2025", price: 1700 },
      { quarter: "Q2 2025", price: 1730 },
      { quarter: "Q3 2025", price: 1770 },
      { quarter: "Q4 2025", price: 1810 },
      { quarter: "Q1 2026", price: 1850 },
      { quarter: "Q2 2026", price: 1920 },
    ],
  };

  const neighborhoods = ["Downtown", "West Mountain", "StoneyCreek"];

  useEffect(() => {
    // Setup D3 Chart
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawing

    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", height);

    const chartData = data[selectedNeighborhood];

    // Scales
    const xScale = d3
      .scalePoint()
      .domain(chartData.map((d) => d.quarter))
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([1400, 2400]) // Focus on the relevant price range
      .range([chartHeight, 0]);

    // Chart Group
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Grid lines (y-axis)
    g.append("g")
      .attr("class", "chart-grid-lines")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat("")
      );

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`);

    g.append("g")
      .attr("class", "chart-axis x-axis")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);

    g.append("g")
      .attr("class", "chart-axis y-axis")
      .call(yAxis);

    // Line generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.quarter))
      .y((d) => yScale(d.price))
      .curve(d3.curveMonotoneX);

    // Add path
    g.append("path")
      .datum(chartData)
      .attr("class", "chart-line")
      .attr("d", lineGenerator);

    // Add circles/dots
    g.selectAll(".chart-dot")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "chart-dot")
      .attr("cx", (d) => xScale(d.quarter))
      .attr("cy", (d) => yScale(d.price))
      .attr("r", 5)
      .on("mouseover", (event, d) => {
        // Find position relative to the container
        const [mx, my] = d3.pointer(event, container);
        setTooltip({
          visible: true,
          x: mx,
          y: my - 70,
          title: d.quarter,
          value: `Avg. Rent: $${d.price}/mo`,
        });
      })
      .on("mousemove", (event, d) => {
        const [mx, my] = d3.pointer(event, container);
        setTooltip((prev) => ({
          ...prev,
          x: mx,
          y: my - 70,
        }));
      })
      .on("mouseout", () => {
        setTooltip({ visible: false, x: 0, y: 0, title: "", value: "" });
      });

    // Check for prefers-reduced-motion to animate path drawing
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      // Path animation
      const path = g.select(".chart-line");
      const totalLength = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(700)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);
    }

  }, [selectedNeighborhood]);

  return (
    <div className="d3-chart-container" ref={containerRef} aria-label="Interactive Rental Market Chart">
      <div className="d3-chart-title-bar">
        <div className="d3-chart-header">
          <h3>Hamilton Rental Price Trend</h3>
          <span className="d3-chart-subtitle">Average listing price (CAD/month)</span>
        </div>
        
        {/* Neighborhood Select Filter */}
        <div className="map-route-list" style={{ flexDirection: "row", gap: "0.5rem" }}>
          {neighborhoods.map((n) => (
            <button
              key={n}
              className={`filter-btn ${selectedNeighborhood === n ? "active" : ""}`}
              onClick={() => setSelectedNeighborhood(n)}
              style={{ fontSize: "0.85rem", padding: "0.25rem 0.5rem" }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="d3-svg-wrapper">
        <svg ref={svgRef} style={{ overflow: "visible" }} />
      </div>

      {tooltip.visible && (
        <div
          className="d3-tooltip"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          <div className="d3-tooltip-title">{tooltip.title}</div>
          <div className="d3-tooltip-value">{tooltip.value}</div>
        </div>
      )}
    </div>
  );
};
