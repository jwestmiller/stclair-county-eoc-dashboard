# Running the EOC Dashboard Unattended (Wall Display / Kiosk)

The dashboard is built to run for days on its own. This guide covers what it does automatically, and the one-time operating-system setup to keep it on a wall display without anyone touching it.

## What the dashboard already handles on its own

- **Live refresh** — every data feed reloads every **5 minutes**.
- **Full page auto-reload** — the whole page reloads on a set interval (default **6 hours**, changeable in Settings) to clear any accumulated browser memory.
- **Watchdog self-heal** — if no feed succeeds for **20 minutes** (frozen network, stuck tab), the page reloads itself automatically.
- **Offline detection** — a red banner appears when the network drops and clears itself when the connection returns, then forces a refresh.
- **Screen wake-lock** — asks the browser to keep the display awake (toggle in Settings). OS power settings below are still the reliable backstop.
- **Feed health row** — green/red dots at the top show at a glance whether any source is down.

## Recommended: point the wall display at the live URL

For an unattended display, use the hosted version rather than a local file so it always has the latest build:

**https://jwestmiller.github.io/stclair-county-eoc-dashboard/**

(If you prefer the local copy, open the `index.html` file directly — everything works the same, but you'll have to copy the file to the display PC whenever it changes.)

## One-time setup on the display PC (Windows)

### 1. Never sleep, never lock
Settings → System → Power → Screen and sleep: set **all** to *Never*.
Also: Settings → Accounts → Sign-in options → "If you've been away, when should Windows require sign-in?" → **Never**.
Screen saver → **(None)**.

### 2. Turn on automatic login
So the PC comes back to the desktop after a power blip without someone typing a password.
Run `netplwiz` → uncheck **"Users must enter a user name and password to use this computer"** → enter the account password once. (If that checkbox is missing, disable Windows Hello sign-in first.)

### 3. Launch the browser fullscreen in kiosk mode on startup
Create a shortcut in the Startup folder (press `Win+R`, type `shell:startup`, Enter) pointing to:

**Microsoft Edge**
```
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --kiosk https://jwestmiller.github.io/stclair-county-eoc-dashboard/ --edge-kiosk-type=fullscreen --no-first-run
```

**Google Chrome**
```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --noerrdialogs --disable-session-crashed-bubble https://jwestmiller.github.io/stclair-county-eoc-dashboard/
```

- `--kiosk` = borderless fullscreen (no tabs, no address bar).
- `--disable-session-crashed-bubble` / `--noerrdialogs` = suppress the "Chrome didn't shut down properly. Restore?" popup after a reboot.
- Do **not** use `--incognito`: incognito clears browser storage on close, which would wipe your saved ESF/activation edits and flood thresholds between browser restarts.

### 4. Restart the browser automatically if it ever closes
Open **Task Scheduler** → Create Task:
- Trigger: **At log on** (and optionally a repeating trigger).
- Action: start the same browser command above.
- Settings: check **"If the task fails, restart every 1 minute"** and **"Run task as soon as possible after a scheduled start is missed."**

### 5. Press the dashboard's "Display" button once
Click **🖥 Display** in the header to enable kiosk view (larger type sized for a room). It's remembered in the browser, so it stays on across reloads.

## Staff controls (no password)

- **ESF board** — click any status pill to cycle **Ready → Elevated → Activated**.
- **Activation banner, flood thresholds, reload interval, chime, wake-lock** — the **⚙ Settings** drawer.
- All changes save in that browser (localStorage). They are per-machine, so the wall display and someone's laptop each keep their own settings.

## Flood-stage thresholds — set these once

River levels show category context ("2.1 ft below action stage") **only after you enter the official numbers**. Open **⚙ Settings → River Flood-Stage Thresholds**, look each gauge up on NWS AHPS (water.noaa.gov), and enter Action / Minor / Moderate / Major in feet. Leave a gauge blank if it has no defined flood stage (e.g., Great Lakes connecting channels like the St. Clair River, which are lake-level driven rather than classic flood-stage gauges).

## Updating the hosted version

To push a new `index.html` to the live site: on GitHub, open the repo → **Add file → Upload files** → drag the new `index.html` in → **Commit changes**. GitHub Pages redeploys in a minute or two, and every display pulls it on its next reload.
