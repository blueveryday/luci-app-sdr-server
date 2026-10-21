'use strict';
'require view';
'require fs';
'require ui';
'require poll';

return view.extend({
	load: function() {
		return Promise.all([
			fs.exec('/etc/init.d/sdr-server', [ 'status' ]),
			fs.exec('/usr/bin/logread', [ '-e', 'sdr-server', '-l', '80' ])
		]).catch(function() { return [{ code: 1, stdout: '' }, { code: 1, stdout: '' }]; });
	},

	render: function(data) {
		var status = E('pre', { 'class': 'cbi-code' }, (data[0].stdout || data[0].stderr || _('未运行或无法获取状态')));
		var logs = E('pre', { 'class': 'cbi-code', 'style': 'max-height: 28em; overflow:auto; white-space:pre-wrap' },
			data[1].stdout || _('暂无日志'));

		function run(action) {
			return fs.exec('/etc/init.d/sdr-server', [ action ]).then(function(res) {
				if (res.code !== 0)
					ui.addNotification(null, E('p', _('操作失败：') + action + '\n' + (res.stderr || res.stdout || '')));
				else
					ui.addNotification(null, E('p', _('已执行：') + action));
				window.setTimeout(function() { window.location.reload(); }, 700);
			}).catch(function(err) {
				ui.addNotification(null, E('p', _('执行命令失败：') + err));
			});
		}

		var buttons = E('div', { 'class': 'right' }, [
			E('button', { 'class': 'cbi-button cbi-button-positive', 'click': function() { run('start'); } }, _('启动')),
			' ',
			E('button', { 'class': 'cbi-button cbi-button-action', 'click': function() { run('restart'); } }, _('重启')),
			' ',
			E('button', { 'class': 'cbi-button cbi-button-negative', 'click': function() { run('stop'); } }, _('停止')),
			' ',
			E('button', { 'class': 'cbi-button', 'click': function() { run('enable'); } }, _('启用开机自启')),
			' ',
			E('button', { 'class': 'cbi-button', 'click': function() { run('disable'); } }, _('禁用开机自启'))
		]);

		return E('div', { 'class': 'cbi-map' }, [
			E('h2', {}, _('SDR 服务状态')),
			E('p', {}, _('管理 sdr-server 服务。建议只允许可信的局域网或 VPN 网段访问服务端口。')),
			buttons,
			E('h3', {}, _('当前状态')),
			status,
			E('h3', {}, _('最近日志')),
			logs
		]);
	}
});
