import { Card, Title, LineChart } from "@tremor/react";

const CumulativeGraph = ({ data, title, categories, range }) => {

  const filteredData = data.filter(item => {
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
export default CumulativeGraph;