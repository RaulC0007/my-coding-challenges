export class SplitSecondStopwatch {
  private _state: 'ready' | 'running' | 'stopped';
  private _currentTime: number; // in seconds
  private _previousLaps: number[];
  private _startTime: number | null;

  constructor() {
    this._state = 'ready';
    this._currentTime = 0;
    this._previousLaps = [];
    this._startTime = null;
  }

  public get state(): 'ready' | 'running' | 'stopped' {
    return this._state;
  }

  public get currentLap(): string {
    let current = this._currentTime;
    if (this._state === 'running' && this._startTime !== null) {
      current += (Date.now() - this._startTime) / 1000;
    }
    return this._formatTime(current);
  }

  public get total(): string {
    let total = this._previousLaps.reduce((sum, lap) => sum + lap, 0);
    total += this._currentTime;
    if (this._state === 'running' && this._startTime !== null) {
      total += (Date.now() - this._startTime) / 1000;
    }
    return this._formatTime(total);
  }

  public get previousLaps(): string[] {
    return this._previousLaps.map(lap => this._formatTime(lap));
  }

  public start(): SplitSecondStopwatch {
    if (this._state === 'running') {
      throw new Error('cannot start an already running stopwatch');
    }
    if (this._state === 'ready' || this._state === 'stopped') {
      this._state = 'running';
      this._startTime = Date.now();
    }
    return this;
  }

  public stop(): SplitSecondStopwatch {
    if (this._state !== 'running') {
      throw new Error('cannot stop a stopwatch that is not running');
    }
    if (this._state === 'running' && this._startTime !== null) {
      this._currentTime += (Date.now() - this._startTime) / 1000;
      this._state = 'stopped';
      this._startTime = null;
    }
    return this;
  }

  public lap(): SplitSecondStopwatch {
    if (this._state !== 'running') {
      throw new Error('cannot lap a stopwatch that is not running');
    }
    if (this._state === 'running' && this._startTime !== null) {
      const elapsed = (Date.now() - this._startTime) / 1000;
      const lapTime = this._currentTime + elapsed;
      this._previousLaps.push(lapTime);
      this._currentTime = 0;
      this._startTime = Date.now();
    }
    return this;
  }

  public reset(): SplitSecondStopwatch {
    if (this._state !== 'stopped') {
      throw new Error('cannot reset a stopwatch that is not stopped');
    }
    this._state = 'ready';
    this._currentTime = 0;
    this._previousLaps = [];
    this._startTime = null;
    return this;
  }

  public advanceTime(duration: string | number): SplitSecondStopwatch {
    // Parse time string like "00:00:05" to seconds
    let seconds: number;
    if (typeof duration === 'string') {
      const parts = duration.split(':').map(Number);
      if (parts.length === 3) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      } else {
        seconds = parseFloat(duration);
      }
    } else {
      seconds = duration;
    }
    
    if (this._state === 'running') {
      this._currentTime += seconds;
    }
    return this;
  }

  private _formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds === undefined || seconds === null) {
      return '00:00:00';
    }
    
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}