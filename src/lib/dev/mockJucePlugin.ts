export function mockJucePlugin() {
	window.__JUCE__ = {
		postMessage() {},
		backend: {
			emitEvent() {},
			addEventListener() {},
		},
		initialisationData: {
			lastPage: [''],
		},
	};
}
