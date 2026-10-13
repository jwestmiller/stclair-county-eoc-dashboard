# St. Clair County EOC — All-Hazards Dashboard

Live all-hazards, weather, response and recovery situational awareness dashboard for the St. Clair County, MI Emergency Operations Center.

**Live site:** https://jwestmiller.github.io/stclair-county-eoc-dashboard/

## What it shows

The dashboard pulls live, keyless public data directly in the browser and auto-refreshes every 5 minutes:

- **Active weather & hazard warnings** — National Weather Service alerts for forecast zone MIZ063 and county zone MIC147.
- **Current conditions & 7-period forecast** — NWS Detroit/Pontiac (WFO DTX).
- **Regional radar** — KDTX RIDGE loop.
- **River & lake levels** — USGS real-time gauges (St. Clair River at Port Huron, Belle River at Memphis) plus NOAA Great Lakes water level at the Black River mouth.
- **Seismic activity** — USGS earthquake feed filtered to the Great Lakes region.
- **Hazardous Weather Outlook** — full NWS DTX text product.
- **Response & Recovery ESF status board** — Emergency Support Function readiness with agency, confirmation time, needs, and a Not verified default.
- **All-hazards quick links** — traffic/closures, power outages, flood forecasts, public health, state/federal EM, shelters, and more.

## Situational-awareness & usability features

- **Top status strip** — EOC posture, active-warning count, highest severity, and a monitoring priority; declared activation is separate from monitoring guidance.
- **Situational map** (Leaflet) — county, river/lake gauges, and NWS warning areas.
- **Flood-stage context** — river gauges show category ("action / minor / moderate / major") and distance to the next stage, only after the operator records an official source, verifier, and matching units/datum in Settings. USGS and USACE stations have separate threshold references. Recent trend sparklines are included.
- **Heat-index context** — current heat index flagged against Caution / Advisory / Warning ranges.
- **Feed-health row** — Current / Delayed / Unavailable labels, retrieval times, and source observation ages. Failed refreshes retain the last successful readings, including across page reloads where browser storage is available. Missing stations or marine forecasts are explicitly partial.
- **New-warning alerting** — new alerts get a neutral New badge. Flashing and optional chimes are limited to new Severe / Extreme alerts. Local coverage is shown before expandable regional coverage and instructions.
- **Editable ESF board** — click a status button to record Not verified / Ready / Elevated / Activated, the responsible agency/operator, and needs. Unconfirmed legacy statuses are migrated to Not verified. Reports become delayed after four hours.
- **Settings drawer** — verified flood thresholds and display preferences. Record activation separately with an authorized representative and timestamp.
- **Kiosk/display mode + light/print theme.**
- **Generate SITREP** — one click opens an in-page printable report with the operational overview, non-weather hazard reports, ESF verification, water levels, and feed health/data gaps.
- **Unattended operation** — 5-min feed refresh, periodic full reload, 20-min watchdog self-heal, offline detection, and screen wake-lock. See `SETUP-UNATTENDED.md`.

## Operational reporting

- The overview records affected areas, incident objectives, outstanding resource needs, and next briefing (Eastern Time).
- Power, roads, Blue Water Bridge, air quality/smoke, public health, and shelter cards support dated manual verification with official source links. These are not automatic live feeds and never default to all-clear. Manual hazard reports become delayed after two hours.
- A local activity history retains the latest 200 operational changes. This is an operator record, not an authenticated audit system.
- Editing remains local to this browser by default. No shared endpoint is enabled or remembered automatically.
- Use **Shared connection** only after your organization provides an approved authenticated service implementing the contract below.

## Shared operations API contract

GitHub Pages does not provide authenticated shared storage. The prepared browser adapter uses an existing service sign-in session (`credentials: include`) and an HTTPS endpoint entered explicitly by the operator. Do not put API keys in this public repository.

`GET <endpoint>` must return JSON containing `revision`, `operations`, `activation`, `esf`, and `thresholds`. `operations` uses version 1 and contains `activation` verification, `overview`, `esf` verification keyed by ESF number, `hazards` keyed by power/roads/border/air/health/shelter, and an `audit` array. Verification records include `by` and `confirmedAt` (ISO 8601). The page source defines the full default shape in `defaultOperations()`. `esf` retains the existing array format and order. Threshold records include stage values, source, datum, verifier, verification time, and `datumMatches`.

`PUT <endpoint>` receives the same operational fields plus `change: {action, by}` and an `If-Match` header containing the revision loaded by GET. The server must reject conflicting writes with HTTP 409 or 412 and return the new revision on success. The UI keeps the form open on failed or conflicting writes; reconnect to load the latest shared revision. Connections last only for the page session.

The service must enforce sign-in, role-based write authorization, server-side schema validation and authoritative audit history, CSRF protections, and credentialed CORS restricted to the dashboard origin. It must accept `Content-Type` and `If-Match` on preflight. No shared service has been provisioned; end-to-end authentication and synchronization require that service.

## Validation

Run `node tests/check-dashboard.cjs index.html`. The checks cover unverified migration, failed-feed retention, stale/partial feeds, threshold verification, Eastern Time/DST, activity persistence, and escaped SITREP content.

## Data sources

- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
- [USGS Water Services](https://waterservices.usgs.gov/)
- [USGS Earthquake feeds](https://earthquake.usgs.gov/earthquakes/feed/)
- [NOAA Tides & Currents](https://tidesandcurrents.noaa.gov/)

## Disclaimer

Unofficial situational-awareness aid. Always confirm life-safety decisions against official NWS and emergency management channels.
