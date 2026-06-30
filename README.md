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

## Data sources

- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
- [USGS Water Services](https://waterservices.usgs.gov/)
- [USGS Earthquake feeds](https://earthquake.usgs.gov/earthquakes/feed/)
- [NOAA Tides & Currents](https://tidesandcurrents.noaa.gov/)

## Disclaimer

Unofficial situational-awareness aid. Always confirm life-safety decisions against official NWS and emergency management channels.
