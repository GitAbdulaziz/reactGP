import { useSelector } from "react-redux";

class RecommendationCalculator {
  constructor(dashboardData, results) {
    this.dashboardData = dashboardData;
    this.results = results;
    this.WEIGHTS = {
      population: 0.25,
      saturation: 0.30,
      income: 0.15,
      poi: 0.20,
      competition: 0.10
    };
  }

  // Fetching values from dashboardData
  getTotalPopulation() {
    return this.dashboardData?.["المعلومات الديموغرافية"]?.find(
      (item) => item["الفئة"] === "عدد السكان"
    )?.["القيمة"] || 0;
  }

  getTotalBusinesses() {
    return this.results.length || 0;
  }

  getAverageIncome() {
    return this.dashboardData?.["متوسط الدخل الشهري"]?.find(
      (item) => item["الفئة"] === "الكل"
    )?.["القيمة"] || 0;
  }

  getPointsOfInterest() {
    return this.dashboardData?.["نقاط الاهتمام"]?.length || 0;
  }

  // Compute each factor
  computeSaturationFactor() {
    const population = this.getTotalPopulation();
    const businesses = this.getTotalBusinesses();
    const saturationRate = population > 0 ? (businesses / population) * 100000 : 0;
    return 100 - Math.min(saturationRate, 100); 
  }

  computePopulationFactor() {
    const population = this.getTotalPopulation();
    const maxPopulation = 500000; 
    return (population / maxPopulation) * 100;
  }

  computeIncomeFactor() {
    const income = this.getAverageIncome();
    return (income / 100000) * 100; 
  }

  computePOIFactor() {
    const poi = this.getPointsOfInterest();
    const maxPOIs = 50; 
    return (poi / maxPOIs) * 100;
  }

  computeCompetitionFactor() {
    const businesses = this.getTotalBusinesses();
    return 100 - Math.min((businesses / 200) * 100, 100);
  }

  // Final Recommendation Score Calculation
  calculate() {
    return (
      (this.computePopulationFactor() * this.WEIGHTS.population) +
      (this.computeSaturationFactor() * this.WEIGHTS.saturation) +
      (this.computeIncomeFactor() * this.WEIGHTS.income) +
      (this.computePOIFactor() * this.WEIGHTS.poi) +
      (this.computeCompetitionFactor() * this.WEIGHTS.competition)
    ).toFixed(2);
  }
}

export default RecommendationCalculator;
