const listOfEmoji = [
  '😈',
  '🤡',
  '💀',
  '👻',
  '👾',
  '👽️',
  '😱',
  '🤠',
  '😶',
  '😵',
  '🦴',
  '🕵️',
  '🧌',
  '🐈‍⬛',
  '🦥',
  '🕷️',
  '🕸️',
  '🚚',
  '🌙',
  '🌕️',
  '🔮',
  '🔪',
]

export const pickRandomEmoji = () => {
  return listOfEmoji[Math.floor(Math.random() * listOfEmoji.length)]
}
