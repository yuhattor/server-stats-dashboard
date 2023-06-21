import React, { useState } from "react";
import {
  Tab,
  TabList,
  TabGroup,
  TabPanels,
  TabPanel,
  Select,
  SelectItem,
  DateRangePicker,
} from '@tremor/react'
import data from '../data/data.json'
import FeaturesEnabledCard from './FeaturesEnabledCard';
import CumulativeGraphDashboard from './CumulativeGraphDashboard'
import ChangeOverTimeGraphDashboard from './ChangeOverTimeGraphDashboard'
import IncreaseDecreaseDashboard from './IncreaseDecreaseGraphDashboard'
import MonthlyChangeTrendGraph from './MonthlyChangeTrendGraphDashboard'
import NavigationBar from "./NavigationBar";

const Dashboard = () => {
  const [serverId, setServerId] = useState(Object.keys(data)[0]);
  const defaultDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
  const [targetMonthStr, setTargetMonthStr] = useState(defaultDate.getFullYear() + '-' + (defaultDate.getMonth() + 1))
  const [range, setRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const yearMonthDict = [];
  let currentDate = new Date();
  while (currentDate >= new Date(2021, 1, 1)) {
    yearMonthDict.push(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1))
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  }

  return (
    <>
      <NavigationBar />
      <main className='bg-slate-200 sm:p-10 dark:bg-slate-900'>
        <Select className="max-w-md" defaultValue={Object.keys(data)[0]} onValueChange={value => setServerId(value)} placeholder="Server ID" >
          {Object.keys(data).map((server_id, i) => <SelectItem value={server_id} key={server_id}>
            {data[server_id]['info']['host_name'] + ' (' + data[server_id]['info']['ghes_version'] + ')'}
          </SelectItem>
          )}
        </Select>
        <FeaturesEnabledCard features={data[serverId]['info']['github_connect']['features_enabled']} />
        <TabGroup>
          <TabList className="mt-4" variant="solid">
            <Tab>Monthly Change Trend</Tab>
            <Tab>Change Over Time</Tab>
            <Tab>Cumulative</Tab>
            <Tab>Increase/Decrease</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Select className="max-w-md mt-4" defaultValue={targetMonthStr} onValueChange={value => setTargetMonthStr(value)} placeholder="Report of the Month" >
                {yearMonthDict.map((key, i) => <SelectItem value={key} text={key} key={key} />)}
              </Select>
              <MonthlyChangeTrendGraph data={data} serverId={serverId} targetMonthStr={targetMonthStr} />
            </TabPanel>
            <TabPanel>
              < DateRangePicker className="max-w-md mt-4" value={range} onValueChange={setRange} selectPlaceholder="Date Selection" />
              <ChangeOverTimeGraphDashboard data={data} serverId={serverId} range={range} />
            </TabPanel>
            <TabPanel>
              < DateRangePicker className="max-w-md mt-4" value={range} onValueChange={setRange} selectPlaceholder="Date Selection" />
              <CumulativeGraphDashboard data={data} serverId={serverId} range={range} />
            </TabPanel>
            <TabPanel>
              < DateRangePicker className="max-w-md mt-4" value={range} onValueChange={setRange} selectPlaceholder="Date Selection" />
              <IncreaseDecreaseDashboard data={data} serverId={serverId} range={range} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>
    </>
  )
}

export default Dashboard
