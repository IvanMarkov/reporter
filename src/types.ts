export type Data = {
  filter_context: {
    filterValues: any;
    filterList: any;
    comparativeIndex: any;
  };
  dashboard_context: {
    filters: any;
    chartList: any;
    displayLegend: boolean;
    fullAxes: boolean;
    legends: any;
    charts: any;
    hasLabels: boolean;
    hasOverlay: boolean;
    treeView: boolean;
    origin: boolean;
    trendlines: boolean;
  };
  comparative_context: {
    isComparative: boolean;
    comparativePanelsNumber: number;
  };
  legend: any;
  chart: any;
  type: string;
  multiple_view: boolean;
  is_dashboard: boolean;
  is_feedback: boolean;
  is_keywords: boolean;
  is_network: boolean;

  data_contexts: any[];
};
