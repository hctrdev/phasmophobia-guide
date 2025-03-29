import { splitRoomId } from '../utils/room'

export const SyncConnectedForm = ({ roomId, userName, disconnect }) => {
  return (
    <div className="has-text-centered">
      <div className="columns is-vcentered is-centered">
        <div className="column is-narrow mr-4">
          <span className="is-size-1">{userName}</span>
        </div>
        <div className="column is-narrow">
          <p>
            <em>connected to room</em>
          </p>
          <span className="is-size-2">{splitRoomId(roomId)}</span>
        </div>
      </div>
      <button className="button is-danger is-outline" onClick={disconnect}>
        Disconnect
      </button>
    </div>
  )
}

export default SyncConnectedForm
