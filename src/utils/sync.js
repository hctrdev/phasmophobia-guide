import { api } from './pocketbase'
import { escapeRoomId } from './room'

export const connectSync = (
  setOnChangeHandler,
  setStateFromSync,
  appendEventToHistory,
  setConnected,
  roomId,
  userName,
) => {
  console.log('connecting ...')
  setOnChangeHandler(() => syncChange(roomId, userName))
  setConnected(roomId, userName)
  loadCurrentRoomState(roomId, onRawLoad(setStateFromSync))
  subscribeForUpdates(roomId, onRawSync(setStateFromSync, appendEventToHistory))
}

export const disconnectSync = (setOnChangeHandler, setDisconnected) => {
  console.log('disconnecting ...')
  setOnChangeHandler(() => () => {})
  setDisconnected()
}

const syncChange = (roomId, userName) => (data) => {
  publishNewState(roomId, userName, data)
}

const onRawSync = (setDataFromSync, appendToHistory) => (rawData) => {
  const state = rawData.record.state
  const event = {
    at: rawData.record.updated,
    by: rawData.record.updated_by,
  }
  setDataFromSync(state)
  appendToHistory(event)
}

const onRawLoad = (setDataFromSync) => (rawData) => {
  const data = rawData.state
  setDataFromSync(data)
}

const publishNewState = (roomId, userName, data) => {
  const escapedRoomId = escapeRoomId(roomId)
  api
    .collection('room_state')
    .create({
      room_id: escapedRoomId,
      state: data,
      updated_by: userName,
    })
    .then(() => console.log('published new state to pocketbase', data))
}

const loadCurrentRoomState = (roomId, handler) => {
  const escapedRoomId = escapeRoomId(roomId)
  api
    .collection('room_state')
    .getFirstListItem(`room_id="${escapedRoomId}"`, { sort: '-created' })
    .then((data) => {
      console.log('current room state from pocketbase', data)
      handler(data)
    })
    .catch((err) => console.log('api error', err))
}

const subscribeForUpdates = (roomId, handler) => {
  const escapedRoomId = escapeRoomId(roomId)
  api.collection('room_state').subscribe('*', (event) => {
    if (event.action !== 'create' || event.record.room_id !== escapedRoomId)
      return
    console.log('room state changes from pocketbase', event)
    handler(event)
  })
}
