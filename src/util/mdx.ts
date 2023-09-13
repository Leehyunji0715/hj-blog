export function getAnchor(text: string) {
    return text
      .toLowerCase()
      .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '') // 특수 문자 제거
      .replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]+/g, '-') // 특수 문자 및 공백 제거 및 대체
      .replace(/^-+|-+$/g, '') // 시작과 끝에 있는 - 문자 제거
      .replace(/-{2,}/g, '-'); // 연속된 - 문자 하나로 대체
}