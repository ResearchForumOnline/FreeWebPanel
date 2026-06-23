#!/usr/bin/env bash
set -euo pipefail

UPSTREAM_INSTALLER_URL="${FREEWEBPANEL_INSTALLER_URL:-https://freewebpanel.com/downloads/thcz-install.sh}"
EXPECTED_INSTALLER_SHA256="${FREEWEBPANEL_INSTALLER_SHA256:-}"

usage() {
  cat <<'EOF'
FreeWebPanel GitHub installer wrapper

This wrapper downloads the official FreeWebPanel installer from freewebpanel.com
and passes your arguments through to it.

Ubuntu production example:
  curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- --hostname panel.example.com --email admin@example.com --server-profile provider

RHEL-family preflight example:
  curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- --hostname panel.example.com --email admin@example.com --allow-rhel-family --preflight-only

ZeroMint AIOS / OpenZero AIOS:
  curl -fsSL https://freewebpanel.com/downloads/freewebpanel-openzero-aios-install.sh | sudo bash -s -- --hostname web.example.com --email admin@example.com

Why this wrapper exists:
  - GitHub is the public install entry point.
  - freewebpanel.com remains the official release, update, Pro, and support channel.
  - No Pro modules, private signing keys, billing secrets, or vendor credentials are stored here.

Pass --help after the wrapper to see the full upstream installer help.
EOF
}

if [[ "${1:-}" == "--github-wrapper-help" ]]; then
  usage
  exit 0
fi

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run through sudo so FreeWebPanel can install packages and write system services." >&2
  usage >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required before FreeWebPanel can download the official installer." >&2
  exit 1
fi

tmp_dir="$(mktemp -d)"
trap 'rm -rf "${tmp_dir}"' EXIT
installer="${tmp_dir}/thcz-install.sh"

curl -fsSL "${UPSTREAM_INSTALLER_URL}" -o "${installer}"
chmod 700 "${installer}"

if [[ -n "${EXPECTED_INSTALLER_SHA256}" ]]; then
  if command -v sha256sum >/dev/null 2>&1; then
    actual_sha="$(sha256sum "${installer}" | awk '{print $1}')"
  elif command -v shasum >/dev/null 2>&1; then
    actual_sha="$(shasum -a 256 "${installer}" | awk '{print $1}')"
  else
    echo "No SHA-256 tool found to verify FREEWEBPANEL_INSTALLER_SHA256." >&2
    exit 1
  fi

  if [[ "${actual_sha}" != "${EXPECTED_INSTALLER_SHA256}" ]]; then
    echo "Installer checksum mismatch." >&2
    echo "Expected: ${EXPECTED_INSTALLER_SHA256}" >&2
    echo "Actual:   ${actual_sha}" >&2
    exit 1
  fi
fi

echo "FreeWebPanel GitHub wrapper"
echo "Official installer: ${UPSTREAM_INSTALLER_URL}"
echo

exec bash "${installer}" "$@"
