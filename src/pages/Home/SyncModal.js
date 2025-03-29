import { useContext } from 'react'
import { SyncConnectForm, SyncConnectedForm } from '../../components'
import { SyncContext } from '../../context/SyncContext'
import { connectSync, disconnectSync } from '../../utils/sync'
import { SelectionContext } from '../../context/SelectionContext'

export const SyncModal = ({ toggleSyncModalOpen }) => {
  const { room, userName, isConnected, setConnected, setDisconnected } =
    useContext(SyncContext)
  const { setOnChangeHandler, setDataFromSync } = useContext(SelectionContext)

  const connect = (roomId, userName) => {
    connectSync(
      setOnChangeHandler,
      setDataFromSync,
      setConnected,
      roomId,
      userName,
    )
    //setTimeout(() => toggleSyncModalOpen(), 750)
  }

  const disconnect = () => {
    disconnectSync(setOnChangeHandler, setDisconnected)
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
              disconnect={disconnect}
            />
          ) : (
            <SyncConnectForm
              roomId={room}
              connect={connect}
            />
          )}
        </section>
      </div>
    </div>
  )
}
