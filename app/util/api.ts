import { BaseResponse, ConnectBody, CronsResponse, DevicesResponse, DisconnectBody, NewCronBody, SetTemperatureBody } from "./types";

export const baseUrl = process.env.BASE_API_URL;

export const auth = {
  Authorization: `Bearer ${window.localStorage.getItem('apikey')}`
}

const getAllCrons = async (): Promise<CronsResponse> => {
  const response = await fetch(`/api/run?route=crons&method=GET`, {
    headers: auth
  });
  const json: CronsResponse = await response.json();
  if (!json.success) {
    console.log(json)
  }
  return json;
}

const getAllDevices = async (): Promise<DevicesResponse> => {
  const response = await fetch(`/api/run?route=devices&method=GET`, {
    headers: auth
  });
  const json: DevicesResponse = await response.json();
  if (!json.success) {
    console.log(json)
  }
  return json;
}

const setDeviceTemperature = async (setTemperatureData: SetTemperatureBody): Promise<BaseResponse> => {
  const response = await fetch(`/api/run?route=settemperature`, {
    method: 'POST',
    body: JSON.stringify(setTemperatureData),
    headers: auth
  })
  const json: BaseResponse = await response.json();
  if (!json.success) {
    console.log(json)
  }
  return json;
}

const connectNewDevice = async (connectData: ConnectBody): Promise<BaseResponse> => {
  const response = await fetch(`/api/run?route=connect`, {
    method: 'POST',
    body: JSON.stringify(connectData),
    headers: auth
  })
  const json: BaseResponse = await response.json();
  if (!json.success) {
    console.log(json)
  }
  return json;
}

const disconnectDevice = async (disconnectData: DisconnectBody): Promise<BaseResponse> => {
  const response = await fetch(`/api/run?route=disconnect`, {
    method: 'POST',
    body: JSON.stringify(disconnectData),
    headers: auth
  })
  const json: BaseResponse = await response.json();
  if (!json.success) {
    console.log(json)
  }
  return json;
}

const newCron = async (cronData: NewCronBody): Promise<void> => {
  const response = await fetch(`/api/run?route=newcron`, {
    method: 'POST',
    body: JSON.stringify(cronData),
    headers: auth
  })
  await response.text();
}

const deleteCron = async (cronName: string): Promise<void> => {
  const response = await fetch(`/api/run?route=removecron`, {
    method: 'POST',
    body: JSON.stringify({ name: cronName }),
    headers: auth
  })
  await response.text();
}

export const Api = {
  getAllCrons,
  getAllDevices,
  setDeviceTemperature,
  connectNewDevice,
  disconnectDevice,
  newCron,
  deleteCron
}