
export default function capitalizeName(name) {
    let firstLetter = name[0].toUpperCase()
    let resOfName = name.toLowerCase().slice(1)
  

  return firstLetter + resOfName
}
