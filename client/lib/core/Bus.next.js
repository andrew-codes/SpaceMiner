const _signals = {};

class Bus {
	static signal(name) {
		if (_signals[name]) return _signals[name];
		_signals[name] = new signals.Signal();
		return _signals[name]; 
	}

	static signalByConvention(target, prefix='handle_') {
		for(let name in target) {
			if (name.indexOf(prefix) === 0) {
				const eventName = name.substr(prefix.length);
				Bus.signal(eventName).add(target[name]);
			}
		}
	}
}

this.Bus = Bus;