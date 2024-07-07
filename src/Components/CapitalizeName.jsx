
export default function capitalizeName(name) {
  let splittedString = name.split(' ')
  let capitalizedWords = splittedString.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  let completeName = capitalizedWords.join(' ')

  return completeName
}
