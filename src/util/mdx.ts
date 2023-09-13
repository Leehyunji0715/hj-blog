export function getAnchor(text: string) {
    return text
      .toLowerCase()
      .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '')
      .replace(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/, '')
      .replace(/[ ]/g, '-');
}
  