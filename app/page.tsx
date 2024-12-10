import CronContainer from "./components/cron/CronContainer";
import DeviceContainer from "./components/devices/DeviceContainer";
import styles from "./page.module.scss";

export default async function Home() {
  const baseUrl = process.env.BASE_API_URL;
  const cronData = await fetch(`${baseUrl}/crons`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
  const cronJson = await cronData.json();

  const deviceData = await fetch(`${baseUrl}/devices`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
  const deviceJson = await deviceData.json();

  return (
    <div className={styles.page}>
      <>
        <CronContainer crons={cronJson.crons} />
        <DeviceContainer devices={deviceJson.devices} />
      </>
    </div>
  );
}
