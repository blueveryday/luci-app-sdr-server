'use strict';
'require form';
'require fs';
'require ui';

return L.view.extend({

	render: function() {
		var m, s, o;

		m = new form.Map('sdr-server', _('SDR 服务配置'),
			_('配置 sdr-server 的监听、采样和 SDR 硬件参数。保存后将自动重新生成程序配置并重启服务。'));

		s = m.section(form.NamedSection, 'main', 'main', _('基本参数'));
		s.addremove = false;

		o = s.option(form.Flag, 'enabled', _('启用服务'));
		o.default = '1';
		o.rmempty = false;

		o = s.option(form.Value, 'bind_address', _('监听 IPv4 地址'));
		o.default = '0.0.0.0';
		o.datatype = 'ip4addr';
		o.description = _('0.0.0.0 表示监听所有 IPv4 接口。请通过防火墙限制访问，不要直接向公网开放该端口。');

		o = s.option(form.Value, 'port', _('TCP 端口'));
		o.datatype = 'port';
		o.default = '8090';
		o.rmempty = false;

		o = s.option(form.ListValue, 'sdr_type', _('SDR 类型'));
		o.value('0', 'RTL-SDR');
		o.value('1', 'Airspy');
		o.value('2', 'HackRF');
		o.default = '0';
		o.rmempty = false;

		o = s.option(form.Value, 'device_index', _('设备编号'));
		o.datatype = 'uinteger';
		o.default = '0';

		o = s.option(form.Value, 'band_sampling_rate', _('总带宽采样率（samples/s）'));
		o.datatype = 'uinteger';
		o.default = '2016000';

		o = s.option(form.Value, 'buffer_size', _('缓冲区大小'));
		o.datatype = 'uinteger';
		o.default = '262144';

		o = s.option(form.Value, 'queue_size', _('队列大小'));
		o.datatype = 'uinteger';
		o.default = '64';

		o = s.option(form.Value, 'read_timeout_seconds', _('读取超时（秒）'));
		o.datatype = 'uinteger';
		o.default = '5';

		o = s.option(form.Value, 'lpf_cutoff_rate', _('低通滤波截止系数'));
		o.datatype = 'ufloat';
		o.default = '5';

		o = s.option(form.ListValue, 'cpu_optimization', _('CPU 优化模式'));
		['NATIVE_CF32', 'GENERIC', 'SSE', 'AVX', 'NEON'].forEach(function(v) { o.value(v, v); });
		o.default = 'NATIVE_CF32';

		o = s.option(form.Flag, 'use_gzip', _('启用 gzip 压缩'));
		o.default = '1';

		o = s.option(form.Value, 'base_path', _('临时/输出目录'));
		o.default = '/tmp/sdr-server';
		o.description = _('请确认此参数与当前 sdr-server 版本的 config.conf 字段一致。');

		s = m.section(form.NamedSection, 'main', 'main', _('RTL-SDR 参数'));
		s.addremove = false;
		o = s.option(form.ListValue, 'gain_mode', _('增益模式'));
		o.value('0', _('自动'));
		o.value('1', _('手动'));
		o.default = '1';
		o = s.option(form.Value, 'gain', _('射频增益（dB）'));
		o.datatype = 'ufloat';
		o.default = '49.0';
		o = s.option(form.Value, 'ppm', _('频率校准（PPM）'));
		o.datatype = 'integer';
		o.default = '0';
		o = s.option(form.Flag, 'bias_t', _('启用 Bias-T'));
		o.default = '0';

		s = m.section(form.NamedSection, 'main', 'main', _('Airspy 参数'));
		s.addremove = false;
		o = s.option(form.ListValue, 'airspy_gain_mode', _('增益模式'));
		o.value('0', _('线性'));
		o.value('1', _('灵敏度'));
		o.default = '0';
		[
			['airspy_vga_gain', _('VGA 增益'), '5'],
			['airspy_mixer_gain', _('混频器增益'), '5'],
			['airspy_lna_gain', _('LNA 增益'), '5'],
			['airspy_linearity_gain', _('线性增益'), '0'],
			['airspy_sensitivity_gain', _('灵敏度增益'), '0']
		].forEach(function(item) {
			o = s.option(form.Value, item[0], item[1]);
			o.datatype = 'uinteger';
			o.default = item[2];
		});

		s = m.section(form.NamedSection, 'main', 'main', _('HackRF 参数'));
		s.addremove = false;
		o = s.option(form.Flag, 'hackrf_amp', _('启用 RF 放大器'));
		o.default = '0';
		o = s.option(form.Value, 'hackrf_lna_gain', _('LNA 增益'));
		o.datatype = 'range(0,40)';
		o.default = '16';
		o = s.option(form.Value, 'hackrf_vga_gain', _('VGA 增益'));
		o.datatype = 'range(0,62)';
		o.default = '20';
		o = s.option(form.Flag, 'hackrf_bias_t', _('启用 Bias-T'));
		o.default = '0';

		m.on_after_commit = function() {
			return fs.exec('/etc/init.d/sdr-server', [ 'restart' ]).then(function(res) {
				if (res.code !== 0)
					ui.addNotification(null, E('p', _('配置已保存，但服务重启失败。请到“服务状态”页面查看日志。')));
			});
		};

		return m.render();
	}
});
