# Notion CMS 설정 가이드

이 블로그는 Notion을 CMS로 사용하여 콘텐츠를 관리합니다.

## 1. Notion Integration 생성

1. [Notion Integrations 페이지](https://www.notion.so/my-integrations)로 이동
2. "New integration" 클릭
3. Integration 이름 입력 (예: "Blog CMS")
4. 권한 설정:
   - Read content
   - Read comments (선택사항)
5. "Submit" 클릭
6. **Internal Integration Token**을 복사 (이 값이 `NOTION_API_KEY`가 됩니다)

## 2. Notion Database 생성

1. Notion에서 새 페이지 생성
2. `/database` 입력하여 Database 생성 (Full page 선택)
3. 다음 속성(Properties) 추가:

| 속성 이름 | 타입 | 설명 | 필수 |
|----------|------|------|------|
| Title | Title | 포스트 제목 | ✅ |
| Description | Text | 포스트 설명 | ✅ |
| Category | Select | 카테고리 | ✅ |
| Date | Date | 작성일 | ✅ |
| Tags | Multi-select | 태그들 | ✅ |
| Published | Checkbox | 공개 여부 | ✅ |
| Image | Text | 썸네일 이미지 (파일명 또는 URL) | ❌ |
| Path | Text | URL 경로 (비워두면 page ID 사용) | ❌ |

4. Database 상단 메뉴에서 "..." 클릭 → "Add connections" → 생성한 Integration 선택
5. Database URL에서 ID 복사:
   ```
   https://www.notion.so/[workspace]/[DATABASE_ID]?v=...
   ```
   여기서 `DATABASE_ID` 부분을 복사 (이 값이 `NOTION_DATABASE_ID`가 됩니다)

## 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 4. 포스트 작성 방법

1. Notion Database에 새 페이지 추가
2. 필수 속성 입력:
   - Title: 포스트 제목
   - Description: 간단한 설명
   - Category: 카테고리 선택
   - Date: 작성일 선택
   - Tags: 태그 추가
   - Published: 체크박스를 체크하면 블로그에 공개됨
3. 페이지 본문에 콘텐츠 작성 (Notion의 모든 블록 타입 사용 가능)
4. 이미지는 Notion에 직접 업로드하거나 외부 이미지 URL 사용

## 5. ISR (Incremental Static Regeneration)

- 기본 재생성 주기: **1시간** (3600초)
- 변경 방법: `src/service/posts.ts`의 `revalidate` 값 수정
- Notion에서 콘텐츠를 수정하면 최대 1시간 후 자동으로 반영됩니다.
- 즉시 반영이 필요한 경우 재배포하세요.

## 6. 이미지 처리

### 옵션 1: Notion에 직접 업로드
- Notion 페이지에 이미지 업로드
- 자동으로 Notion의 CDN에 호스팅됨
- `Image` 속성은 비워두거나 로컬 이미지 파일명 입력

### 옵션 2: 로컬 이미지 사용
- `public/images/posts/` 폴더에 이미지 저장
- `Image` 속성에 파일명만 입력 (예: `my-image.jpg`)

### 옵션 3: 외부 URL 사용
- `Image` 속성에 전체 URL 입력
- 필요시 `next.config.js`에 도메인 추가

## 7. 트러블슈팅

### Notion API 호출 제한
- Notion API는 초당 3회 요청 제한
- ISR 사용으로 빌드 타임에 모든 페이지 생성
- 런타임에는 재생성 시에만 API 호출

### 이미지 로딩 실패
- Next.js config에 이미지 도메인이 추가되었는지 확인
- Notion 이미지 URL은 1시간 후 만료됨 (ISR로 자동 갱신)

### 빌드 실패
- 환경 변수가 올바르게 설정되었는지 확인
- Notion Integration이 Database에 연결되었는지 확인
- Database ID가 정확한지 확인

## 8. 개발 모드 실행

```bash
npm run dev
```

개발 모드에서도 실시간으로 Notion API를 호출하므로 변경사항이 즉시 반영됩니다.

## 9. 프로덕션 빌드

```bash
npm run build
npm start
```

빌드 시 모든 Published된 포스트가 정적 페이지로 생성됩니다.
