export const isRoomIdValid = (roomId) => {
  const cleanRoomId = roomId.replace(/ /g, '')
  const roomIdRegex = /^[0-9]+$/
  return (
    roomId &&
    cleanRoomId.length >= 6 &&
    cleanRoomId.length <= 12 &&
    roomIdRegex.test(cleanRoomId)
  )
}
