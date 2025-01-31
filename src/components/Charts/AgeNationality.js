import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Apply amCharts theme
am4core.useTheme(am4themes_animated);

const AgeNationality3D = () => {
  const chartRef = useRef(null);
  const dashboardData = useSelector((state) => state.app.dashboardData);

  const rawData = dashboardData?.["بيانات السكان حسب فئات العمر والجنسية"] || [];

  const transformedData = rawData.reduce((acc, item) => {
    const ageGroup = item["الفئة_العمرية"];
    const nationality = item["الجنسية"];
    const size = item["الحجم"];

    let existingGroup = acc.find((group) => group.ageGroup === ageGroup);
    if (!existingGroup) {
      existingGroup = { ageGroup, Saudis: 0, NonSaudis: 0, Total: 0 };
      acc.push(existingGroup);
    }

    if (nationality === "سعوديون") {
      existingGroup.Saudis += size;
    } else if (nationality === "غير سعوديين") {
      existingGroup.NonSaudis += size;
    }
    existingGroup.Total = existingGroup.Saudis + existingGroup.NonSaudis; // Calculate total

    return acc;
  }, []);

  // Ensure all age groups are represented, even with 0 values
  const allAgeGroups = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "+80"];
  allAgeGroups.forEach((group) => {
    if (!transformedData.find((data) => data.ageGroup === group)) {
      transformedData.push({ ageGroup: group, Saudis: 0, NonSaudis: 0, Total: 0 });
    }
  });

  // Initialize the chart
  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart3D);
    chart.data = transformedData;

    // Create X-Axis
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "ageGroup";
categoryAxis.renderer.labels.template.rotation = 270; 
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.title.text = "الفئات العمرية";
categoryAxis.title.fill = am4core.color("#FFFFFF"); 
categoryAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");

// Create Y-Axis
let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "الحجم";
valueAxis.title.fill = am4core.color("#FFFFFF"); 
valueAxis.renderer.labels.template.fill = am4core.color("#FFFFFF"); 


    // Saudis Bar
    let saudisSeries = chart.series.push(new am4charts.ColumnSeries3D());
    saudisSeries.dataFields.valueY = "Saudis";
    saudisSeries.dataFields.categoryX = "ageGroup";
    saudisSeries.name = "سعوديون";
    saudisSeries.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
    saudisSeries.columns.template.fill = am4core.color("#8A2BE2"); 
    saudisSeries.columns.template.stroke = am4core.color("#8A2BE2");

    // Non-Saudis Bar
    let nonSaudisSeries = chart.series.push(new am4charts.ColumnSeries3D());
    nonSaudisSeries.dataFields.valueY = "NonSaudis";
    nonSaudisSeries.dataFields.categoryX = "ageGroup";
    nonSaudisSeries.name = "غير سعوديين";
    nonSaudisSeries.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
    nonSaudisSeries.columns.template.fill = am4core.color("#5539CC"); 
    nonSaudisSeries.columns.template.stroke = am4core.color("#5539CC");

    // Total Bar
    let totalSeries = chart.series.push(new am4charts.ColumnSeries3D());
    totalSeries.dataFields.valueY = "Total";
    totalSeries.dataFields.categoryX = "ageGroup";
    totalSeries.name = "المجموع";
    totalSeries.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
    totalSeries.columns.template.fill = am4core.color("#FFFFFF"); 
    totalSeries.columns.template.stroke = am4core.color("#FFFFFF");

   // Add a legend
chart.legend = new am4charts.Legend();
chart.legend.position = "bottom";
chart.legend.labels.template.fill = am4core.color("#FFFFFF"); 
chart.legend.valueLabels.template.fill = am4core.color("#FFFFFF"); 
chart.legend.itemContainers.template.background.fillOpacity = 0; 


    // Save chart instance
    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [transformedData]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default AgeNationality3D;
