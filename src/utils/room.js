export const escapeRoomId = (roomId) => roomId.replace(/\s/g, '')

export const splitRoomId = (roomId) => {
  const escapedRoomId = escapeRoomId(roomId)
  return `${escapedRoomId.slice(0, 3)} ${escapedRoomId.slice(3, 6)}`
}
