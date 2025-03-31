import { useContext } from 'react'
import { SyncConnectForm, SyncConnectedForm } from '../../components'
import { SyncContext } from '../../context/SyncContext'
import { connectSync } from '../../utils/sync'
import { SelectionContext } from '../../context/SelectionContext'

export const SyncModal = ({ toggleSyncModalOpen }) => {
  const { room, userName, disconnectFn, setDisconnectFn, isConnected, setConnected, setDisconnected, history, historySize, appendToHistory } =
    useContext(SyncContext)
  const { setOnChangeHandler, setDataFromSync } = useContext(SelectionContext)

  const connect = async (roomId, userName) => {
    const disconnect = await connectSync(
      setOnChangeHandler,
      setDataFromSync,
      appendToHistory,
      setConnected,
      setDisconnected,
      roomId,
      userName,
    )
    console.log("connected 2")
    setDisconnectFn(() => disconnect)
console.log("connected 3")
    //setTimeout(() => toggleSyncModalOpen(), 750)
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={toggleSyncModalOpen} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-uppercase has-letter-spacing mb-0">
            <span className="icon mr-3">
              <i className="fa fa-users" />
            </span>
            Realtime Sync
          </p>
          <button
            className="delete p-4"
            aria-label="close"
            onClick={toggleSyncModalOpen}
          />
        </header>
        <section className="modal-card-body">
          {isConnected ? (
            <SyncConnectedForm
              roomId={room}
              userName={userName}
              disconnect={disconnectFn}
              history={history}
              historySize={historySize}
            />
          ) : (
            <SyncConnectForm roomId={room} connect={connect} />
          )}
        </section>
      </div>
    </div>
  )
}
