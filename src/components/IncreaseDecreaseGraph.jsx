import { Card, Title, BarChart } from "@tremor/react";


const getDailyChangeData = (data) => {
  return data.map((currentData, i) => {
    if (i === 0) return currentData;
    const previousData = data[i - 1];
    const filteredObject = { Date: currentData.Date };
    for (const key in currentData) {
      if (key !== "Date") {
        filteredObject[key] = currentData[key] - previousData[key];
      }
    }
    return filteredObject;
  });
}

const IncreaseDecreaseGraph = ({ data, title, categories, range }) => {
  const filteredData = getDailyChangeData(data).filter(item => {
    const currentDate = new Date(item.Date);
    return currentDate >= range.from && currentDate <= range.to;
  });
  
  return (
    <Card height="h-80" className="server-stats-card">
      <Title>{title}</Title>
      <BarChart
        data={filteredData}
        categories={categories}
        index="Date"
        height="h-72"
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
}

export default IncreaseDecreaseGraph;
