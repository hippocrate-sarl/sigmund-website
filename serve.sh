#!/usr/bin/env bash
# ------------------------------------------------------------------
#  Sigmund — Jekyll local server via Docker (Linux / macOS)
#  Usage:  ./serve.sh            -> http://localhost:4000
#          ./serve.sh --livereload
#          PORT=4001 ./serve.sh
#  Stop:   Ctrl+C
# ------------------------------------------------------------------
set -euo pipefail

PORT="${PORT:-4000}"

echo "Starting Jekyll on http://localhost:${PORT}"...
echo

docker run --rm -it \
  -v "$(pwd):/srv/jekyll" \
  -w /srv/jekyll \
  -e BUNDLE_PATH=/srv/jekyll/vendor/bundle \
  -e HOME=/tmp \
  --user "$(id -u):$(id -g)" \
  -p "${PORT}:4000" \
  ruby:3.3 \
  sh -c "bundle install --quiet && bundle exec jekyll serve --host 0.0.0.0 --force_polling $*"
