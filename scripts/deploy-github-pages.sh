#!/usr/bin/env bash
set -euo pipefail

repo_slug="${REPO_SLUG:-icelemon233/cinna-travel}"
fetch_remote="${DEPLOY_FETCH_REMOTE:-https://github.com/${repo_slug}.git}"
push_remote="${DEPLOY_REMOTE:-git@github.com:${repo_slug}.git}"
branch="${DEPLOY_BRANCH:-gh-pages}"
site_dir="dist"
deploy_dir="$(mktemp -d)"

cleanup() {
  rm -rf "$deploy_dir"
}
trap cleanup EXIT

if ! git ls-remote "$fetch_remote" >/dev/null 2>&1; then
  echo "Remote repository does not exist or is not accessible: $fetch_remote" >&2
  exit 1
fi

pnpm build:pages
touch "$site_dir/.nojekyll"
cp "$site_dir/index.html" "$site_dir/404.html"

if ! grep -q '<title>Cinna Travel｜Cinna 旅行手册</title>' "$site_dir/index.html"; then
  echo "Unexpected Pages build output: $site_dir/index.html" >&2
  exit 1
fi

if ! git clone --depth 1 --branch "$branch" "$fetch_remote" "$deploy_dir" >/dev/null 2>&1; then
  git clone --depth 1 "$fetch_remote" "$deploy_dir" >/dev/null
  git -C "$deploy_dir" checkout --orphan "$branch"
  git -C "$deploy_dir" rm -rf . >/dev/null 2>&1 || true
fi

rsync -a --delete --exclude ".git" "$site_dir"/ "$deploy_dir"/
touch "$deploy_dir/.nojekyll"

git -C "$deploy_dir" add -A
if git -C "$deploy_dir" diff --cached --quiet; then
  echo "No Pages changes to publish."
  exit 0
fi

git -C "$deploy_dir" commit -m "Publish Cinna Travel site"
git -C "$deploy_dir" remote set-url origin "$push_remote"
git -C "$deploy_dir" push origin "$branch"
