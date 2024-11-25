"use client";


import { Api } from "@/app/util/api";
import { useDeviceStore } from "@/app/util/stores/deviceStore";
import { ReactElement, useEffect } from "react";
import WidgetContainer from '../WidgetContainer';
import AddDevice from "./AddDevice";
import DeviceItem from "./DeviceItem";

const DeviceContainer = (): ReactElement => {
  const deviceStore = useDeviceStore((state) => state);
  
  useEffect(() => {
    Api.getAllDevices().then((data) => {
      deviceStore.setDevices(data.devices);
    })
  }, [])

  return (
    <WidgetContainer useGrid label='devices'>
      {deviceStore.devices.map(device => (
        <DeviceItem key={device.name} device={device} />
      ))}
      <AddDevice />
    </WidgetContainer>
  )
}

export default DeviceContainer;
