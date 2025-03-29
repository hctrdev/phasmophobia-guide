export const SyncConnectedForm = ({ roomId, userName, disconnect }) => {
  return (
    <>
      <p>
        Connected as <strong>{userName}</strong> to room
        <strong>{roomId}</strong>
      </p>
      <button className="button is-danger is-outline" onClick={disconnect}>
        Disconnect
      </button>
    </>
  )
}

export default SyncConnectedForm
