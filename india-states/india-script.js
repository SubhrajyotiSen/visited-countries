const stateNames = {
  INAN: "Andaman and Nicobar Islands",
  INAP: "Andhra Pradesh",
  INAR: "Arunachal Pradesh",
  INAS: "Assam",
  INBR: "Bihar",
  INCH: "Chandigarh",
  INCT: "Chhattisgarh",
  INDN: "Dadra and Nagar Haveli and Daman and Diu",
  INDL: "Delhi",
  INGA: "Goa",
  INGJ: "Gujarat",
  INHP: "Himachal Pradesh",
  INHR: "Haryana",
  INJH: "Jharkhand",
  INJK: "Jammu and Kashmir",
  INKA: "Karnataka",
  INKL: "Kerala",
  INLD: "Lakshadweep",
  INMH: "Maharashtra",
  INML: "Meghalaya",
  INMN: "Manipur",
  INMP: "Madhya Pradesh",
  INMZ: "Mizoram",
  INNL: "Nagaland",
  INOR: "Odisha",
  INPB: "Punjab",
  INPY: "Puducherry",
  INRJ: "Rajasthan",
  INSK: "Sikkim",
  INTG: "Telangana",
  INTN: "Tamil Nadu",
  INTR: "Tripura",
  INUP: "Uttar Pradesh",
  INUT: "Uttarakhand",
  INWB: "West Bengal",
  INLA: "Ladakh",
};

(function () {
  d3.xml("https://simplemaps.com/static/svg/country/in/admin1/in.svg")
    .mimeType("image/svg+xml")
    .get(function (error, xml) {
      if (error || !xml || !xml.documentElement) {
        d3.select("#map-error").style("display", "block");
        return;
      }

      document.querySelector("#svg").appendChild(xml.documentElement);

      const svg = d3.select("#svg svg");
      svg.attr("width", "100%");
      svg.attr("height", "100%");
      svg.attr("preserveAspectRatio", "xMidYMid meet");

      d3.selectAll("path").each(function () {
        d3.select(this).attr("fill", "#e8dcc8");
        d3.select(this).attr("stroke", "#1a3a3a");
        d3.select(this).attr("stroke-width", "0.5");
      });

      const tooltip = d3.select("#country-tooltip");

      d3.selectAll("path")
        .on("mouseover", function () {
          d3.selectAll(".hover").classed("hover", false);
          d3.select(this).classed("hover", true);
          showTooltip(this.id, d3.event);
        })
        .on("mousemove", function () {
          moveTooltip(d3.event);
        })
        .on("mouseout", function () {
          d3.selectAll(".hover").classed("hover", false);
          hideTooltip();
        });

      function showTooltip(stateId, event) {
        const stateName = stateNames[stateId] || stateId;
        tooltip.text(stateName);
        tooltip.classed("visible", true);
        if (event) {
          moveTooltip(event);
        }
      }

      function moveTooltip(event) {
        const tooltipNode = tooltip.node();
        const tooltipWidth = tooltipNode.offsetWidth;
        const tooltipHeight = tooltipNode.offsetHeight;
        tooltip
          .style("left", event.clientX - tooltipWidth / 2 + "px")
          .style("top", event.clientY - tooltipHeight - 15 + "px");
      }

      function hideTooltip() {
        tooltip.classed("visible", false);
      }

      indiaStates.forEach(function (state) {
        d3.select("#IN" + state).style("fill", "#e07a5f");
      });

      d3.select("#number-states").text(indiaStates.length);
      d3.select("#india-percent").text(
        Math.round((100 * indiaStates.length) / 36) + "%"
      );
    });
})();
