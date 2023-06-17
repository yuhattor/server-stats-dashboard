import React from "react";
import { Title } from "@tremor/react";
import MonthlyChangeTrend from "./MonthlyChangeTrendGraph";
import ReportGraphProperties from '../data/ReportGraphProperties';

const reportGraphProperties = ReportGraphProperties
const ReportDashboard = ({ data, serverId, targetMonthStr }) => {
  return (
    <>
      {reportGraphProperties.map((graphGroup) => (
        <React.Fragment key={graphGroup.title}>
          <Title className="text-3xl m-4 dashboard-header">{graphGroup.title}</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {graphGroup.data.map((graphItem) => (
              <MonthlyChangeTrend
                key={graphItem.title}
                title={graphItem.title}
                data={data[serverId][graphItem.key]}
                targetMonthStr={targetMonthStr}
                categories={graphItem.categories}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  )
}

export default ReportDashboard;
