// @ts-check

export class SplitSecondStopwatch {
  constructor() {
    this._state = 'ready';
    this._previousLaps = [];
    
    // Guardamos el tiempo transcurrido simulado en segundos discretos
    this._totalSeconds = 0;
    this._currentLapSeconds = 0;
  }

  /** @returns {string} */
  get state() {
    return this._state;
  }

  /** @returns {string} */
  get total() {
    return this._format(this._totalSeconds);
  }

  /** @returns {string} */
  get currentLap() {
    return this._format(this._currentLapSeconds);
  }

  /** @returns {string[]} */
  get previousLaps() {
    return this._previousLaps;
  }

  start() {
    if (this._state === 'running') {
      throw new Error('cannot start an already running stopwatch');
    }
    this._state = 'running';
  }

  stop() {
    if (this._state !== 'running') {
      throw new Error('cannot stop a stopwatch that is not running');
    }
    this._state = 'stopped';
  }

  lap() {
    if (this._state !== 'running') {
      throw new Error('cannot lap a stopwatch that is not running');
    }
    this._previousLaps.push(this._format(this._currentLapSeconds));
    this._currentLapSeconds = 0;
  }

  reset() {
    if (this._state !== 'stopped') {
      throw new Error('cannot reset a stopwatch that is not stopped');
    }
    this._state = 'ready';
    this._previousLaps = [];
    this._totalSeconds = 0;
    this._currentLapSeconds = 0;
  }

  /**
   * Avanza el tiempo del cronómetro sumando el formato "HH:MM:SS" recibido.
   * Solo acumula tiempo si el estado actual es 'running'.
   * @param {string} timeString 
   */
  advanceTime(timeString) {
    // Convertimos la cadena "HH:MM:SS" a segundos totales
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const secondsToAdvance = (hours * 3600) + (minutes * 60) + seconds;

    if (this._state === 'running') {
      this._totalSeconds += secondsToAdvance;
      this._currentLapSeconds += secondsToAdvance;
    }
  }

  /** @private */
  _format(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
}