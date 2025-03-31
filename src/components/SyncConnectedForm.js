import { splitRoomId } from '../utils/room'

export const SyncConnectedForm = ({ roomId, userName, disconnect }) => {
  return (
    <div className="columns">
      <div className="column">
        <div className="mb-5">
          <p className="lowercase is-italic mb-0">you are</p>
          <p className="is-size-2 has-text-centered">{userName}</p>
        </div>

        <div className='mb-5'>
          <p className="lowercase is-italic mb-0">connected to room</p>
          <p className="is-size-2 has-text-centered">{splitRoomId(roomId)}</p>
        </div>

        <button className="button is-danger is-outline is-fullwidth" onClick={disconnect}>
          Disconnect
        </button>
      </div>
      <div className="column">
        {/* <p>Updates</p> */}
      </div>
    </div>
  )
}

export default SyncConnectedForm
