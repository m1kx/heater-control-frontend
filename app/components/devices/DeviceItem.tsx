"use client"

import { useEffect, useState } from 'react';
import styles from './DeviceItem.module.scss';

import { Api } from '@/app/util/api';
import { useDeviceStore } from '@/app/util/stores/deviceStore';
import { Device } from "@/app/util/types";
import classNames from 'classnames';
import Trash from '../icons/Trash';

interface Props {
  device: Device;
}

const DeviceItem = ({ device }: Props) => {
  const deviceStore = useDeviceStore((state) => state);
  const [targetTemperature, setTargetTemperature] = useState(device.targetTemperature);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Api.setDeviceTemperature({
      targetTemperature,
      rfAddress: device.rfAddress
    }).then(() => setIsLoading(false));
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetTemperature])

  const onIncreaseClicked = async () => {
    setTargetTemperature(targetTemperature + 0.5);
  }

  const onDecreaseClicked = () => {
    setTargetTemperature(targetTemperature - 0.5);
  }

  const onTrashClicked = async () => {
    setIsLoading(true);
    deviceStore.removeDevice(device.rfAddress);
    await Api.disconnectDevice({
      rfAddress: device.rfAddress
    })
    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.deviceHeader}>
        <div>{device.name}</div>
        <div className={styles.delete} onClick={onTrashClicked}><Trash size={17} /></div>
      </div>
      <div className={styles.stats}>
        <div>{device.valvePosition} %</div>
        {device.measuredTemperature !== 0 && <div>{device.measuredTemperature} °C</div>}
      </div>
      <div className={classNames(styles.temperatureControl, {
        [styles.loading!]: isLoading
      })}>
        <button onClick={onDecreaseClicked}>-</button>
        <div>{targetTemperature}</div>
        <button onClick={onIncreaseClicked}>+</button>
      </div>
    </div>
  )
}

export default DeviceItem;
