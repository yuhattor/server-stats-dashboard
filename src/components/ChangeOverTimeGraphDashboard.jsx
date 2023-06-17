import React from "react";
import { Title } from "@tremor/react";
import ChangeOverTimeGraph from './ChangeOverTimeGraph'
import GraphProperties from '../data/GraphProperties'

const graphProperties = GraphProperties

const ChangeOverTimeGraphDashboard = ({ data, serverId, range }) => {
  return (
    <>
      {graphProperties.map((graphGroup) => (
        <React.Fragment key={graphGroup.title}>
          <Title className="text-4xl dashboard-header">{graphGroup.title}</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {graphGroup.data.map((graphItem) => (
              <ChangeOverTimeGraph
                key={graphItem.key}
                title={graphItem.title}
                data={data[serverId][graphItem.key]}
                range={range}
                categories={graphItem.categories}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  )
}

export default ChangeOverTimeGraphDashboard;