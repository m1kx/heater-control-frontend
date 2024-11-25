"use client"

import { Api } from '@/app/util/api';
import { useCronStore } from '@/app/util/stores/cronStore';
import { useDeviceStore } from '@/app/util/stores/deviceStore';
import { Cron } from '@/app/util/types';
import classNames from 'classnames';
import { ReactElement, useRef, useState } from 'react';
import Plus from '../icons/Plus';
import styles from './AddCron.module.scss';

import cronParser from 'cron-parser';
import cronstrue from 'cronstrue';


const AddCron = (): ReactElement => {
  const deviceStore = useDeviceStore();
  const cronStore = useCronStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const cronInput = useRef<HTMLInputElement>(null);
  const tempInput = useRef<HTMLInputElement>(null);

  const plusClicked = () => {
    setIsInputActive(true);
  }

  const addClicked = async () => {
    setIsLoading(true);
    const newCron: Cron = {
      cron: cronInput.current!.value,
      name: nameInput.current!.value,
      temperature: Number(tempInput.current!.value),
      rfAdresses: deviceStore.devices.filter(device => {
        return (document.getElementById(device.name) as HTMLInputElement).checked
      }).map(device => device.rfAddress)
    }
    cronStore.addCron(newCron);
    await Api.newCron(newCron);
    setIsInputActive(false);
    setIsLoading(false);
  }

  const [cronExpression, setCronExpression] = useState('* * * * *');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleCronChange = (e: any) => {
    const value = e.target.value;
    setCronExpression(value);

    try {
      cronParser.parseExpression(value);
      setError('');
      const desc = cronstrue.toString(value);
      setDescription(desc);
    } catch (err) {
      console.log(err);
      setError('Invalid cron expression');
      setDescription('');
    }
  };

  return (
    <div className={styles.container}>
      <div onClick={plusClicked} className={classNames(styles.addCron, {
        [styles.inputActive!]: isInputActive,
        [styles.loading!]: isLoading,
      })}>
        {isInputActive ? (
          <div className={styles.optionContainer}>
            <div>
              {deviceStore.devices.map(device => (
                <div key={device.name} className={styles.deviceSelectElement}>
                  <label htmlFor={device.name}>{device.name}</label>
                  <input id={`${device.name}`} type='checkbox' />
                </div>
              ))}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {description && <p>{description}</p>}
            <div className={styles.inputContainer}>
              <input ref={cronInput} type="text" placeholder="cron" value={cronExpression} onChange={handleCronChange} />
              <input ref={nameInput} type="text" placeholder="name" />
              <input ref={tempInput} type="number" placeholder="temp" />
              <button onClick={addClicked}>add</button>
            </div>
          </div>
        ) : (
          <Plus size={30} />
        )}
      </div>
    </div>
  )
}

export default AddCron;
