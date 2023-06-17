import { Card, Title, LineChart } from "@tremor/react";

// Get the change over time data
const getChangeOverTimeData = (data, startDate) => {
  const filteredData = [];
  let startIndex = data.findIndex(item => new Date(item.Date) >= startDate);
  if (startIndex === -1) return filteredData;
  for (let i = startIndex + 1; i < data.length; i++) {
    const currentData = data[i];
    const filteredObject = { Date: currentData.Date };
    for (const key in currentData) {
      if (key !== "Date") {
        filteredObject[key] = currentData[key] - data[startIndex][key];
      }
    }
    filteredData.push(filteredObject);
  }
  return filteredData;
};

const ChangeOverTimeGraph = ({ data, title, categories, range })  =>{

  // Filter the data based on the range
  const filteredData = getChangeOverTimeData(data, range.from).filter(item => {
    const currentDate = new Date(item.Date);
    return currentDate >= range.from && currentDate <= range.to;
  });

  return (
    <Card height="h-80" className="server-stats-card">
      <Title>{title}</Title>
      <LineChart
        data={filteredData}
        categories={categories}
        index="Date"
        height="h-72"
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
}
export default ChangeOverTimeGraph;
