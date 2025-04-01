export const getUserList = (history) => {
  console.log('user list from', history)
  return [...new Set(history.map((e) => e.by))]
}
