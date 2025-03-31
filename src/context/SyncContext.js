import { createContext, useState } from 'react'

const SyncContext = createContext()

const SyncContextProvider = ({ children }) => {
  const isSyncFeatureEnabled =
    process.env.REACT_APP_REALTIME_SYNC_ENABLED === 'true'
  const [room, setRoom] = useState('')
  const [userName, setUserName] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [history, setHistory] = useState([])

  const setConnected = (roomId, userName) => {
    clearHistory()
    setRoom(roomId)
    setUserName(userName)
    setIsConnected(true)
  }

  const setDisconnected = () => {
    setIsConnected(false)
    clearHistory()
  }

  const clearHistory = () => {
    setHistory([])
  }

  const appendToHistory = (event) => {
    console.log("history", event)
    setHistory(prev => [event, ...prev]);
  }

  return (
    <SyncContext.Provider
      value={{
        isSyncFeatureEnabled,
        room,
        userName,
        isConnected,
        history,
        setConnected,
        setDisconnected,
        clearHistory,
        appendToHistory,
      }}
    >
      {children}
    </SyncContext.Provider>
  )
}

export { SyncContext, SyncContextProvider }
