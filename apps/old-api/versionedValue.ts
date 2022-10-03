export class VersionedValue<T> {
	private payload: T;
	private majorVersion: bigint;
	private minorVersion: bigint;
	private listeners = new Array<() => void>();

	constructor(payload: T, majorVersion = -1n, minorVersion = -1n) {
		this.payload = payload;
		this.majorVersion = majorVersion;
		this.minorVersion = minorVersion;
	}

	isNewer(majorVersion: bigint, minorVersion: bigint | undefined): boolean {
		return (
			majorVersion > this.majorVersion ||
			(majorVersion === this.majorVersion && minorVersion !== undefined && minorVersion > this.minorVersion)
		);
	}

	update(payload: T, majorVersion: bigint, minorVersion?: bigint): void {
		if (this.isNewer(majorVersion, minorVersion)) {
			this.payload = payload;
			this.majorVersion = majorVersion;
			if (minorVersion !== undefined) {
				this.minorVersion = minorVersion;
			}
			this.callListeners();
		}
	}

	enforceUpdate(payload: T): void {
		this.payload = payload;
		this.callListeners();
	}

	incrementalUpdate(payload: T) {
		this.payload = payload;
		this.majorVersion += 1n;
		this.callListeners();
	}

	getPayload(): T {
		return this.payload;
	}

	getMajorVersion(): bigint {
		return this.majorVersion;
	}

	getMinorVersion(): bigint {
		return this.minorVersion;
	}

	addListener(listener: () => void) {
		this.listeners.push(listener);
	}

	removeListener(listener: () => void) {
		this.listeners = this.listeners.filter((foo) => foo !== listener);
	}

	private callListeners() {
		this.listeners.forEach((listener) => listener());
	}
}
