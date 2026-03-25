// Error classes remain the same
export class BatchIsEmpty extends Error {
  constructor() { super('Batch is empty'); }
}

export class QualityThresholdNotMet extends Error {
  constructor() { super('Quality threshold not met'); }
}

export class NotAvailable extends Error {
  constructor() { super('Not yet translated'); }
}

export class Untranslatable extends Error {
  constructor() { super('Untranslatable'); }
}

export class TranslationService {
  constructor(api) {
    this.api = api;
  }

  free(text) {
    return this.api.fetch(text)
      .then(result => result.translation)
      .catch(error => { throw error; });
  }

  batch(texts) {
    if (texts.length === 0) return Promise.reject(new BatchIsEmpty());
    return Promise.all(texts.map(text => this.free(text)));
  }

  request(text) {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 3;
      
      const tryRequest = () => {
        attempts++;
        this.api.request(text, (error) => {
          if (!error) resolve();
          else if (attempts < maxAttempts) tryRequest();
          else reject(error);
        });
      };
      
      tryRequest();
    });
  }

  premium(text, quality) {
    return this.api.fetch(text)
      .then(result => {
        if (result.quality >= quality) return result.translation;
        throw new QualityThresholdNotMet();
      })
      .catch(error => {
        // Check for NotAvailable error
        if (error.message.includes('not been translated') || error instanceof NotAvailable) {
          return this.request(text)
            .then(() => this.api.fetch(text))
            .then(result => {
              if (result.quality >= quality) return result.translation;
              throw new QualityThresholdNotMet();
            });
        }
        throw error;
      });
  }
}