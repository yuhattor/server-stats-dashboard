import React from 'react'
import { Title, Text, Card, List, ListItem, Bold } from '@tremor/react'
import Features from "../data/Features"

const featuresEnabled = Features

const FeaturesEnabledCard = ({ features }) => {
  return (
    <Card className="mt-4">
      <Title>GitHub Connect Features Enabled</Title>
      <List className="mt-2" key="Feature Enabled">
        <div className="grid md:grid-cols-3 lg:grid-cols-5">
          {
            Object.keys(featuresEnabled).map((key, value) =>
              <ListItem key={key}>
                {
                  features.includes(featuresEnabled[key]) ?
                    <Text>✅<Bold>&nbsp;{key}</Bold></Text>
                    :
                    <Text>❌&nbsp;{key}</Text>
                }
              </ListItem>
            )}
        </div>
      </List>
    </Card>
  )
}

export default FeaturesEnabledCard