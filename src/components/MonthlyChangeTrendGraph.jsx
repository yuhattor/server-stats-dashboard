import { Card, Title, LineChart, BadgeDelta } from "@tremor/react";

// Get the data of the previous month
const getTargetMonthData = (data, targetMonth) => {
  // Get the data of the previous month
  const monthStart = new Date(targetMonth.getFullYear(), targetMonth.getMonth() - 1, 1);
  const monthEnd = new Date(targetMonth.getFullYear(), targetMonth.getMonth() - 1, 31);
  let monthStartIndex = data.findIndex(item => new Date(item.Date) >= monthStart);
  const previousMonthData = data.filter(item => new Date(item.Date) >= monthStart && new Date(item.Date) <= monthEnd);
  return previousMonthData.map(item => {
    let combinedData = { "Date": parseInt(item.Date.split("-")[2]) };
    for (const key in item) {
      if (key !== "Date") {
        combinedData[key] = item[key] - data[monthStartIndex][key];
      }
    }
    return combinedData;
  });
}

// Convert the "YYYY-MM" format to Date object
const text2month = (monthText) => {
  return new Date(
    parseInt(monthText.split("-")[0]),
    parseInt(monthText.split("-")[1]) - 1,
    1
  );
}

const compareMonthData = (targetMonthData, previousMonthData) => {
  if (targetMonthData.length === 0 || previousMonthData.length === 0) return [];
  const combinedMonthData = [];
  for (let i = 0; i < 31; i++) {
    const combinedData = { "Date": i + 1 };
    for (const key in previousMonthData[0]) {
      if (key === "Date") continue;
      if (targetMonthData[i]) combinedData[key] = targetMonthData[i][key];
      if (previousMonthData[i]) combinedData["last_month_" + key] = previousMonthData[i][key];
    }
    combinedMonthData.push(combinedData);
  }
  return combinedMonthData;
};

// This function is used to calculate the MoM change of the target month
const getMoM = (targetMonthData, previousMonthData) => {
  // if there is no data for the previous month or target month return an empty object
  if (targetMonthData.length === 0 || previousMonthData.length === 0) return {};

  const keys = Object.keys(previousMonthData[0]);
  const momData = {};
  for (let i = 0; i < 31; i++) {
    keys.forEach((key) => {
      if (targetMonthData[i]) momData[key] = targetMonthData[i][key];
      if (previousMonthData[i]) momData[`last_month_${key}`] = previousMonthData[i][key];
    });
  }

  keys.forEach((key) => {
    if (momData[`last_month_${key}`] === 0) {
      momData[`mom_${key}`] = "N/A";
    } else {
      momData[`mom_${key}`] = Math.round(((momData[key]) * 1.0 / momData[`last_month_${key}`] - 1) * 10000) / 100;
    }
    momData[`mom_change_${key}`] = momData[key] - momData[`last_month_${key}`];
  });

  return momData;
};

const MonthlyChangeTrend = ({ data, title, categories, targetMonthStr }) => {
  const targetMonth = text2month(targetMonthStr)
  const targetMonthData = getTargetMonthData(data, targetMonth);
  const previousMonthData = getTargetMonthData(data, new Date(targetMonth.getFullYear(), targetMonth.getMonth() - 1, 1));
  const momData = getMoM(targetMonthData, previousMonthData);

  return (
    <Card className="server-stats-card">
      <Title className="float-left">{title} </Title>
      <div className="flex flex-row-reverse">
        {momData["mom_" + categories[1]] > 0 ? <BadgeDelta deltaType="moderateIncrease">{momData["mom_" + categories[1]]}%</BadgeDelta>
          : momData["mom_" + categories[1]] < 0 ? <BadgeDelta deltaType="moderateDecrease">{momData["mom_" + categories[1]]}%</BadgeDelta>
            : momData["mom_" + categories[1]] === "N/A" ? <></>
              : <></>
        }
        <span className="m-1"></span>
        {momData["mom_change_" + categories[1]] > 0 ? <BadgeDelta deltaType="increase">{momData["mom_change_" + categories[1]]}</BadgeDelta>
          : momData["mom_change_" + categories[1]] < 0 ? <BadgeDelta deltaType="decrease">{momData["mom_change_" + categories[1]]}</BadgeDelta>
            : <BadgeDelta deltaType="unchanged"></BadgeDelta>
        }
      </div>
      <LineChart
        className="mt-2"
        data={compareMonthData(targetMonthData, previousMonthData)}
        categories={categories}
        index="Date"
        height="h-72"
        colors={["slate", "red"]}
      />
    </Card>
  );
};

export default MonthlyChangeTrend;
