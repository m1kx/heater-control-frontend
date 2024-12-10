"use client";

import { useCronStore } from "@/app/util/stores/cronStore";
import { ReactElement, useEffect } from "react";
import WidgetContainer from "../WidgetContainer";
import AddCron from "./AddCron";
import CronItem from "./CronItem";
import { Cron } from "@/app/util/types";

interface Props {
  crons: Cron[];
}

const CronContainer = ({ crons }: Props): ReactElement => {
  const cronStore = useCronStore((state) => state);

  useEffect(() => {
    cronStore.setCrons(crons);
  }, []);

  return (
    <WidgetContainer label="cronjobs">
      {cronStore.crons.map((cron) => (
        <CronItem key={cron.name} cron={cron} />
      ))}
      <AddCron />
    </WidgetContainer>
  );
};

export default CronContainer;
