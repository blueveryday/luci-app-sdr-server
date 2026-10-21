include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-sdr-server
PKG_VERSION:=1.0
PKG_RELEASE:=1
PKG_LICENSE:=MIT
PKGARCH:=all

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-sdr-server
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=Services
  TITLE:=LuCI support for sdr-server
  DEPENDS:=+luci-base +rpcd-mod-file +sdr-server
endef

define Package/luci-app-sdr-server/description
 LuCI management interface for sdr-server: configuration, service control and logs.
endef

define Build/Compile
endef

define Package/luci-app-sdr-server/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./root/etc/config/sdr-server $(1)/etc/config/sdr-server
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./root/etc/init.d/sdr-server $(1)/etc/init.d/sdr-server
	$(INSTALL_DIR) $(1)/usr/libexec
	$(INSTALL_BIN) ./root/usr/libexec/sdr-server-render-config $(1)/usr/libexec/sdr-server-render-config
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d
	$(INSTALL_DATA) ./root/usr/share/luci/menu.d/luci-app-sdr-server.json $(1)/usr/share/luci/menu.d/luci-app-sdr-server.json
	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DATA) ./root/usr/share/rpcd/acl.d/luci-app-sdr-server.json $(1)/usr/share/rpcd/acl.d/luci-app-sdr-server.json
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/sdr-server
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/sdr-server/status.js $(1)/www/luci-static/resources/view/sdr-server/status.js
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/sdr-server/config.js $(1)/www/luci-static/resources/view/sdr-server/config.js
endef

$(eval $(call BuildPackage,luci-app-sdr-server))
