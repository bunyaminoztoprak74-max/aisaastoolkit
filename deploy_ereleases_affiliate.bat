@echo off
cd /d D:\Projects\aisaastoolkit
echo === eReleases Affiliate Integration — aisaastoolkit.com ===
echo.
echo Committing 4 new PR/press release blog posts with CJ affiliate links...
git add src/data/blog.ts
git commit -m "feat: add eReleases affiliate content cluster (4 blog posts)

New posts targeting press release / PR distribution keywords:
- ereleases-review-2026 (pillar review, CTA + pros/cons + FAQ schema)
- best-press-release-distribution-services (comparison table, 7 services)
- ereleases-vs-pr-newswire (head-to-head comparison)
- press-releases-ai-startups (strategy guide for AI SaaS companies)

CJ Affiliate link: https://www.jdoqocy.com/click-101761541-10871438
All posts: rel=nofollow noopener sponsored, FAQ JSON-LD schema, internal links"
echo.
echo === Pushing to remote (triggers Vercel deploy) ===
git push
echo.
echo === Waiting 45 seconds for Vercel deploy ===
timeout /t 45 /nobreak >nul
echo.
echo === Verifying live URLs ===
curl -o nul -s -w "eReleases Review:     %%{http_code}\n" https://aisaastoolkit.com/blog/ereleases-review-2026
curl -o nul -s -w "Best PR Services:     %%{http_code}\n" https://aisaastoolkit.com/blog/best-press-release-distribution-services
curl -o nul -s -w "eReleases vs PRN:     %%{http_code}\n" https://aisaastoolkit.com/blog/ereleases-vs-pr-newswire
curl -o nul -s -w "Press Releases AI:    %%{http_code}\n" https://aisaastoolkit.com/blog/press-releases-ai-startups
echo.
echo === Done! ===
echo New URLs:
echo   https://aisaastoolkit.com/blog/ereleases-review-2026
echo   https://aisaastoolkit.com/blog/best-press-release-distribution-services
echo   https://aisaastoolkit.com/blog/ereleases-vs-pr-newswire
echo   https://aisaastoolkit.com/blog/press-releases-ai-startups
pause
