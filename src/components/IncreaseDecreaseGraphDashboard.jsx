import React from "react";
import { Title } from "@tremor/react";
import IncreaseDecreaseGraph from './IncreaseDecreaseGraph'
import GraphProperties from '../data/GraphProperties'

const graphProperties = GraphProperties
const IncreaseDecreaseGraphDashboard = ({ data, serverId, range }) => {
  return (
    <>
      {graphProperties.map((graphGroup) => (
        <React.Fragment key={graphGroup.title}>
          <Title className="text-4xl dashboard-header">{graphGroup.title}</Title>
          {graphGroup.data.map((graphItem) => (
            data[serverId][graphItem.key] && (
              <React.Fragment key={graphItem.key}>
                <Title className="mt-6 text-3xl">{graphItem.title}</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {graphItem.categories.map((category) => (
                    <IncreaseDecreaseGraph
                      key={`${graphItem.key}-${category}`}
                      title={category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      data={data[serverId][graphItem.key]}
                      range={range}
                      categories={[category]}
                    />
                  ))}
                </div>
              </React.Fragment>
            )
          ))}
        </React.Fragment>
      ))}
    </>
  )
}

export default IncreaseDecreaseGraphDashboard;