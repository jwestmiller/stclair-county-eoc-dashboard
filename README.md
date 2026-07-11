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
- **Response & Recovery ESF status board** — Emergency Support Function readiness (set by EOC staff in the page source).
- **All-hazards quick links** — traffic/closures, power outages, flood forecasts, public health, state/federal EM, shelters, and more.

## Situational-awareness & usability features

- **Top status strip** — EOC posture, active-warning count, highest severity, and the single top priority right now.
- **Situational map** (Leaflet) — county, river/lake gauges, and NWS warning areas.
- **Flood-stage context** — river gauges show category ("action / minor / moderate / major") and distance to the next stage, once thresholds are set in Settings. 72-hour trend sparklines included.
- **Heat-index context** — current heat index flagged against Caution / Advisory / Warning ranges.
- **Feed-health row** — per-source green/red status so a down feed is obvious vs. a true "all clear."
- **New-warning alerting** — new alerts flash, get a "New" badge, and optionally chime.
- **Editable ESF board** — click a pill to cycle Ready → Elevated → Activated. No login; saved in the browser.
- **Settings drawer** — activation banner, flood thresholds, reload interval, chime, and wake-lock, all password-free.
- **Kiosk/display mode + light/print theme.**
- **Generate SITREP** — one click builds a printable daily situation report from the live data.
- **Unattended operation** — 5-min feed refresh, periodic full reload, 20-min watchdog self-heal, offline detection, and screen wake-lock. See `SETUP-UNATTENDED.md`.

## Data sources

- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
- [USGS Water Services](https://waterservices.usgs.gov/)
- [USGS Earthquake feeds](https://earthquake.usgs.gov/earthquakes/feed/)
- [NOAA Tides & Currents](https://tidesandcurrents.noaa.gov/)

## Disclaimer

Unofficial situational-awareness aid. Always confirm life-safety decisions against official NWS and emergency management channels.
