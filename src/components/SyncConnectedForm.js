import { splitRoomId } from '../utils/room'

const getUserList = (history) => {
  console.log("user list from", history)
  return [...new Set(history.map((e) => e.by))]
}

const getTime = (ts) => {
  return `${new Date(ts).toLocaleTimeString()}`
}

export const SyncConnectedForm = ({ roomId, userName, disconnect, history }) => {
  return (
    <div className="columns">
      <div className="column">
        <div className="mb-5">
          <p className="lowercase is-italic mb-0">you are</p>
          <p className="is-size-2 has-text-centered">{userName}</p>
        </div>

        <div className="mb-5">
          <p className="lowercase is-italic mb-0">connected to room</p>
          <p className="is-size-2 has-text-centered">{splitRoomId(roomId)}</p>
        </div>

        <button
          className="button is-danger is-outline is-fullwidth"
          onClick={disconnect}
        >
          Disconnect
        </button>
      </div>
      <div className="column">
          <p className="lowercase is-italic mb-0 has-text-centered">change history</p>

          <div className="columns is-mobile is-centered mt-1">
          {getUserList(history).map((u) => {
            return <span className="column is-narrow mx-2" key={u}>{u}</span>
          })}
          </div>
<hr />            
          <ol>

        {history?.map((e) => {
          return (<li key={e.at}>
            <span className="is-italic mr-3">{getTime(e.at)}</span> <span className="is-size-4">{e.by}</span>
            </li>)
        } )}
          </ol>
      </div>
    </div>
  )
}

export default SyncConnectedForm
