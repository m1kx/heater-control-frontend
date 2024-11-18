"use client"

import classNames from 'classnames';
import Plus from '../icons/Plus';
import styles from './AddDevice.module.scss';

import { Api } from '@/app/util/api';
import { ReactElement, useState } from 'react';

const AddDevice = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const connectDevice = async () => {
    setIsLoading(true);
    await Api.connectNewDevice({
      name: inputValue
    })
    setIsLoading(false)
  }

  const plusClicked = () => {
    setIsInputActive(true);
  }

  const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const keyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsInputActive(false);
      await connectDevice();
      Api.getAllDevices();
    }
  }

  return (
    <div className={styles.container}>
      <div 
        onClick={plusClicked}
        className={classNames({
          [styles.loading!]: isLoading
        })}
      >
        {isInputActive ? (
          <input type="text" onKeyDown={keyDown} onInput={inputChanged} placeholder="device name" />
        ) : (
          <Plus />
        )}
      </div>
    </div>
  )
}

export default AddDevice;
