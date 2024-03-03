export function trimAlphaNumeric(str: string) {
  const removedSpaceStr = str.replace('%20', '')
  return removedSpaceStr.replace(/[^a-zA-Z0-9]/g, '')
}
