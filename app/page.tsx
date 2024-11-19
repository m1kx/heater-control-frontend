"use client"

import { useEffect, useState } from "react";
import CronContainer from "./components/cron/CronContainer";
import DeviceContainer from "./components/devices/DeviceContainer";
import LoginForm from "./components/LoginForm";
import styles from "./page.module.scss";

export default function Home() {
  const [apikey, setApikey] = useState<string | null>(null)
  
  useEffect(() => {
    setApikey(localStorage.getItem('apikey'))
  }, [])

  return (
    <div className={styles.page}>
      {apikey ? (<><CronContainer />
        <DeviceContainer /></>) : <LoginForm />}
    </div>
  );
}
