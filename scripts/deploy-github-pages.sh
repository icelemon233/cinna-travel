#!/usr/bin/env bash
set -euo pipefail

repo_slug="${REPO_SLUG:-icelemon233/cinna-travel}"
fetch_remote="${DEPLOY_FETCH_REMOTE:-https://github.com/${repo_slug}.git}"
push_remote="${DEPLOY_REMOTE:-git@github.com:${repo_slug}.git}"
branch="${DEPLOY_BRANCH:-gh-pages}"
deploy_dir="$(mktemp -d)"

cleanup() {
  rm -rf "${deploy_dir:?}"
}
trap cleanup EXIT

if ! git ls-remote "$fetch_remote" >/dev/null 2>&1; then
  echo "Remote repository is not accessible: $fetch_remote" >&2
  exit 1
fi

if ! git clone --single-branch --branch "$branch" "$fetch_remote" "$deploy_dir" >/dev/null 2>&1; then
  git clone "$fetch_remote" "$deploy_dir" >/dev/null
  git -C "$deploy_dir" checkout --orphan "$branch"
  git -C "$deploy_dir" rm -r --ignore-unmatch . >/dev/null 2>&1 || true
fi

git -C "$deploy_dir" rm -r --ignore-unmatch . >/dev/null 2>&1 || true
rsync -a --exclude ".git" \
  --include "/index.html" \
  --include "/assets/***" \
  --include "/.nojekyll" \
  --exclude "*" \
  ./ "$deploy_dir"/
cp index.html "$deploy_dir/404.html"
touch "$deploy_dir/.nojekyll"

git -C "$deploy_dir" add -A
if git -C "$deploy_dir" diff --cached --quiet; then
  echo "No Pages changes to publish."
  exit 0
fi

git -C "$deploy_dir" commit -m "Publish Tibet itinerary"
git -C "$deploy_dir" remote set-url origin "$push_remote"
git -C "$deploy_dir" push origin "$branch"
