# luci-app-sdr-server

OpenWrt LuCI management package for `sdr-server`.

## Contents

- UCI configuration at `/etc/config/sdr-server`
- procd service at `/etc/init.d/sdr-server`
- LuCI menu under **Service -> SDR 服务**
- Status controls and recent logs
- Configuration fields for RTL-SDR, Airspy and HackRF
- Renderer writes `/etc/sdr-server/config.conf`

## Build in the existing OpenWrt SDK

Copy this directory to `~/op/sdk/package/new/luci-app-sdr-server`, then run:

```sh
cd ~/op/sdk
make package/new/luci-app-sdr-server/compile V=s
```

Install the resulting `luci-app-sdr-server-*.apk` together with the existing `sdr-server` package.
