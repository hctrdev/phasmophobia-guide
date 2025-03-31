import { useRef, useState, useEffect } from 'react'
import { isRoomIdValid } from '../utils/validation'
import { pickRandomEmoji } from '../data/emoji'

export const SyncConnectForm = ({ roomId, connect }) => {
  const roomIdRef = useRef(null)

  const [roomIdValid, setRoomIdValid] = useState(isRoomIdValid(roomId))

  const onRoomIdChange = (e) => {
    const roomId = e.target.value
    setRoomIdValid(isRoomIdValid(roomId))
  }

  useEffect(() => {
    roomIdRef.current.focus()
  }, [roomIdRef])

  const handleConnect = () => {
    const emoji = pickRandomEmoji()
    connect(roomIdRef.current.value, emoji)
  }

  return (
    <>
      <div className="field">
        <label className="label">Room ID</label>
        <div className="control">
          <input
            ref={roomIdRef}
            className="input"
            type="text"
            defaultValue={roomId ?? ''}
            onChange={onRoomIdChange}
            placeholder="000 000"
          />
        </div>
        {roomIdValid || (
          <p className="help is-danger">This room ID is invalid</p>
        )}
      </div>
      <div className="control pt-4">
        <button
          className="button is-success"
          disabled={!roomIdValid}
          onClick={handleConnect}
        >
          Connect
        </button>
      </div>
    </>
  )
}

export default SyncConnectForm
