import { splitRoomId } from "../utils/room"

export const ReactiveSyncStatusButton = ({
  isConnected,
  toggleSyncModal,
  roomId,
}) => {
  return (
    <button
      className={'button' + (isConnected ? ' is-success' : '')}
      onClick={toggleSyncModal}
      title="Sync"
    >
      <span className="icon is-small">
        <i
          className={'fa' + (isConnected ? ' fa-sync fa-spin' : ' fa-users')}
        />
      </span>
      {isConnected ? <span>{splitRoomId(roomId)}</span> : ''}
    </button>
  )
}

export default ReactiveSyncStatusButton
