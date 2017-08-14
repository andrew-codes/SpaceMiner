const _signals = {};

class Bus {
	static signal(name) {
		if (_signals[name]) return _signals[name];
		_signals[name] = new signals.Signal();
		return _signals[name]; 
	}

	static addSignalHandlersByConvention(target, prefix='handle_') {
		for(let name in target) {
			if (name.indexOf(prefix) === 0) {
				const eventName = name.substr(prefix.length);
				Bus.signal(eventName).add(target[name]);
			}
		}
	}
}

const publish = (eventName, eventData) => Bus.signal(eventName).dispatch(eventData);
const subscribe = (eventName, handler) => Bus.signal(eventName).add(handler);
const subscribeAll = target => Bus.addSignalHandlersByConvention(target);

this.Bus = Bus;
this.publish = publish;
this.subscribe = subscribe;
this.subscribeAll = subscribeAll;