# JIMILEE Next Portfolio

React + Next.js + Tailwind CSS로 만든 포트폴리오 사이트입니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

## 이미지 최적화

- 메인 그리드는 `thumbnail.webp` 사용
- 상세 페이지는 `detail.webp` 사용
- 영상은 메인에서 자동 재생하지 않고 상세 페이지에서만 `preload="metadata"`로 로드
- 로고는 `logo.webp`로 압축

이미지를 교체할 때는 `public/images/work-n/thumbnail.webp`, `detail.webp` 파일명을 유지하면 코드 수정 없이 반영됩니다.
