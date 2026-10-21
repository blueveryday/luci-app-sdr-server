include $(TOPDIR)/rules.mk

PKG_NAME:=sdr-server
PKG_VERSION:=1.0
PKG_RELEASE:=1

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

CMAKE_OPTIONS += \
	-DNO_MANUAL_SIMD=ON \
	-DBUILD_SPECTROGRAM=ON \
	-DBUILD_PROJECT_TESTS=OFF

define Package/sdr-server
  SECTION:=net
  CATEGORY:=Network
  TITLE:=TCP server for RTL-SDR
  URL:=https://github.com/dernasherbrezon/sdr-server
  DEPENDS:=+libconfig +librtlsdr +libairspy +libhackrf +libfftw3f +libpng +zlib
endef

define Package/sdr-server/description
  TCP server for remote access to SDR devices, configured for RTL-SDR.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	$(CP) $(CURDIR)/* $(PKG_BUILD_DIR)/
endef

define Package/sdr-server/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/sdr_server $(1)/usr/bin/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/sdr_server_client $(1)/usr/bin/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/sdr_spectrogram $(1)/usr/bin/

	$(INSTALL_DIR) $(1)/etc/sdr-server
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/src/resources/config.conf $(1)/etc/sdr-server/config.conf
endef

$(eval $(call BuildPackage,sdr-server))