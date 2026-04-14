# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

TokenBlast is a single-page interactive config generator for Claude Code environment flags. It helps users find their preferred balance of cost, tokens, and thinking. Hosted at www.tokenblast.cc via GitHub Pages.

## Architecture

- **Single file app**: Everything lives in `index.html` — HTML, CSS, and JavaScript in one ~1800-line file.
- **No build step**: Static site served directly by GitHub Pages. No bundler, no dependencies, no package.json.
- **CNAME**: Custom domain `www.tokenblast.cc`.
- **Analytics**: Google Analytics (G-8R8LDJ97C2).

## Development

Open `index.html` in a browser. No server required (though `python3 -m http.server` works for local dev).

## Deployment

Push to `main` — GitHub Pages serves automatically. Main = production.

## Design System

CSS custom properties define the theme in `:root`. Key palette:
- `--strawberry-red` / `--tangerine-dream` / `--seashell` / `--graphite` / `--shadow-grey`
- Semantic tokens derived from palette: `--bg-*`, `--text-*`, `--accent-*`, `--status-*`
- Font: Overpass Mono (Google Fonts)
