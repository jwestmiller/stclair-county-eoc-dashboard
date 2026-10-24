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

## Wall display mode

Select **Display** to open a presentation designed for a room display. It starts on Overview and rotates every 40 seconds by default through Overview, Weather & Water, Infrastructure, Response, and DTE Outages. Choose 30, 40, or 45 seconds, pause/resume, use Previous/Next, or select any page directly. Fullscreen uses the browser fullscreen control; Operator view returns to the complete editable dashboard. Display mode, interval, and pause preference are remembered in this browser; a page reload starts at Overview.

The persistent header shows declared activation, incident name, clock, and NWS monitoring priority. Main text scales from roughly 29 px at 1080p to 58 px at 4K. Short summaries show affected areas, objectives, briefing time, power/road impacts, response readiness, radar/forecast, and gauges. Longer reports are abbreviated with an explicit prompt to use Operator view. Automatic summaries reuse the same verification and stale-data rules as the detailed dashboard; unavailable alert data never becomes an all-clear.

Source retrieval and observation ages are shown separately in large text. Manual reports retain confirmation-age warnings. An offline banner stays visible across all pages. The DTE page gives the provider’s map its own large area; provider-controlled labels are not artificially enlarged, and the manual power summary is shown on Overview/Infrastructure. The same iframe returns to its original position when leaving Display mode. Wall content updates without restarting the radar animation.

Keyboard shortcuts when focus is outside controls: Left/Right for pages, Space to pause/resume, Escape to leave wall mode when the browser is not fullscreen. The original activation, ESF, hazard, map-location, and SITREP controls remain in Operator view.

## Operational reporting

- The overview records affected areas, incident objectives, outstanding resource needs, and next briefing (Eastern Time).
- Power, roads, Blue Water Bridge, air quality/smoke, public health, and shelter cards support dated manual verification with official source links. These are not automatic live feeds and never default to all-clear. Manual hazard reports become delayed after two hours.
- A local activity history retains the latest 200 operational changes. This is an operator record, not an authenticated audit system.
- Editing remains local to this browser by default. No shared endpoint is enabled or remembered automatically.
- Use **Shared connection** only after your organization provides an approved authenticated service implementing the contract below.

## County operations map

- OpenStreetMap streets and USGS topographic backgrounds require no API key. The previous CARTO background was removed after it returned API-key-required tiles. Tile backgrounds need internet access; no tiles are bulk downloaded or cached for offline use.
- The official NWS MIC147 county geometry was retrieved on October 13, 2026 and bundled with the page. Fit county resets the view; Fit incidents frames all recorded manual locations; Fullscreen expands the map.
- Toggle county, alerts, gauges, incidents, shelters, and closures independently. Alert retrieval uses the same county and marine zones as the alert board. Solid shapes are NWS alert polygons; dashed shapes are affected-zone boundaries and are not precise hazard footprints. Failed overlay refreshes retain the previous shapes with a stale-data message.
- Select Add location, then click the map, or use Enter coordinates. Records require a name, type, status, report source, operator, and valid coordinates. Edit existing records through their popups or the manual location list. Use Resolved to retire a report while retaining its history.
- Manual records save in local browser storage, appear in SITREP, and are included in the prepared shared-service payload under operations.incidents. No automatic shelter or closure feed is claimed.
- Gauge popups display USGS level, observation age, trend, discharge, feed health, verified thresholds where configured, and an official source link.
- Attribution remains visible. Sources: https://operations.osmfoundation.org/policies/tiles/ and https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer .

## DTE county outage map

The infrastructure / power-outage area embeds the same DTE/KUBRA map host used by DTE’s official outage center. It opens in County mode at latitude 42.843832, longitude -82.707501, zoom 9, framing St. Clair County. The provider’s public client supports lat/lng/zoom and county-view query parameters; its embed headers permit framing. The source URL is https://d1ff4iuzxu9t4h.cloudfront.net/?lat=42.843832&lng=-82.707501&zoom=9&c=VisibilityConfig&o=ViewByCounty .

Select a shaded county to inspect DTE’s county details. Reset to county / refresh restores the initial view. The larger-map link opens the same county view; the official-center link opens https://outage.dteenergy.com/map . This map covers DTE customers only, and provider data refresh stays under DTE’s control. Dashboard manual power-status reports remain separate. The iframe is kept outside periodic card redraws so normal status updates do not reload it. No outage totals are copied into the dashboard or claimed as county totals.

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
