@echo off
echo yes > responses.txt
echo no >> responses.txt
npx create-next-app@latest my-next-app --typescript --eslint --tailwind --src-dir --app < responses.txt
del responses.txt