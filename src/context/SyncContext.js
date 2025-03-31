import { createContext, useState } from 'react'

const SyncContext = createContext()

const SyncContextProvider = ({ children }) => {
  const isSyncFeatureEnabled =
    process.env.REACT_APP_REALTIME_SYNC_ENABLED === 'true'
  const [disconnectFn, setDisconnectFn] = useState(() => () => {})
  const [room, setRoom] = useState('')
  const [userName, setUserName] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [history, setHistory] = useState([])
  const [historySize, setHistorySize] = useState(0)

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
    setHistorySize(0)
  }

  const appendToHistory = (event) => {
    console.log("history", event)
    setHistorySize(prev => prev + 1)
    setHistory(prev => 
      [event, ...prev.slice(0, 15)]
    );
  }

  return (
    <SyncContext.Provider
      value={{
        isSyncFeatureEnabled,
        room,
        userName,
        isConnected,
        history,
        historySize,
        disconnectFn,
        setDisconnectFn,
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
