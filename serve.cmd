@echo off
REM ------------------------------------------------------------------
REM  Sigmund — Jekyll local server via Docker (Windows)
REM  Usage:  serve.cmd            -> http://localhost:4000
REM          serve.cmd --livereload
REM  Stop:   Ctrl+C
REM ------------------------------------------------------------------
setlocal

if "%PORT%"=="" set PORT=4000

echo Starting Jekyll on http://localhost:%PORT%...
echo.

docker run --rm -it ^
  -v "%cd%:/srv/jekyll" ^
  -w /srv/jekyll ^
  -e BUNDLE_PATH=/srv/jekyll/vendor/bundle ^
  -p %PORT%:4000 ^
  ruby:3.3 ^
  sh -c "bundle install --quiet && bundle exec jekyll serve --host 0.0.0.0 --force_polling %*"

endlocal
