This is a Next.js, Sass CSS blog project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Referenced [`timlrx/tailwind-nextjs-starter-blog`](https://github.com/timlrx/tailwind-nextjs-starter-blog) for SEO

실제 배포되어 사용되는 사이트 [Personal Blog](https://bearlee0715.com)

## Getting Started

### Install
Sharp install is required for image optimization
```bash
npm i sharp
```

Run the development server

```bash
npm run dev
```

### Build
```bash
npm run build
```

## 기술 스택
Nextjs 13 (App Routing) 
React
Sass
MDX

<!-- ### 배포
NGINX
AWS lightsail -->


## 변경 가능한 부분

포스트 데이터: `data/posts/{file name}.mdx`, `data/posts.json`

프로젝트 데이터: `data/projects.ts`

카테고리 모델: `model/Category.ts`

.env 파일은 건들 필요 없음

## TODO
[] 옵션 포스트댓글

[] SEO