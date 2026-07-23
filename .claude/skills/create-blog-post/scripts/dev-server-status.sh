#!/usr/bin/env bash
# Reports whether the local Next.js dev server is accepting connections.
#
# Prints exactly one word — `up` or `down` — and nothing else, so the caller can
# branch on it without parsing prose. Optional first arg overrides the port
# (default 3000, which is what `pnpm dev` / AUTH_URL use here).
#
# Uses bash's built-in /dev/tcp so it needs no curl/nc; `timeout` guards against
# a hang if the port is firewalled rather than simply closed.
port="${1:-3000}"
if timeout 2 bash -c "exec 3<>/dev/tcp/127.0.0.1/${port}" 2>/dev/null; then
  echo up
else
  echo down
fi
