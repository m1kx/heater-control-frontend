
"use client";

import { Api } from "@/app/util/api";
import { useCronStore } from "@/app/util/stores/cronStore";
import { ReactElement, useEffect } from "react";
import WidgetContainer from '../WidgetContainer';
import AddCron from "./AddCron";
import CronItem from "./CronItem";

const CronContainer = (): ReactElement => {
  const cronStore = useCronStore((state) => state);
  
  useEffect(() => {
    Api.getAllCrons().then((data) => {
      cronStore.setCrons(data.crons);
    })
  }, [])

  return (
    <WidgetContainer label='cronjobs'>
      {cronStore.crons.map(cron => (
        <CronItem key={cron.name} cron={cron} />
      ))}
      <AddCron />
    </WidgetContainer>
  )
}

export default CronContainer;
