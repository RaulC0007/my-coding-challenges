export class SimpleCipher {
  private _key: string;

  constructor(key?: string) {
    if (key) {
      // Validate that the key contains only lowercase letters
      if (!/^[a-z]+$/.test(key)) {
        throw new Error('Key must contain only lowercase letters');
      }
      this._key = key;
    } else {
      // Generate a random key of 100 lowercase letters
      this._key = this.generateRandomKey();
    }
  }

  get key(): string {
    return this._key;
  }

  encode(plaintext: string): string {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < plaintext.length; i++) {
      const plainChar = plaintext[i];
      
      // Only encode lowercase letters
      if (plainChar >= 'a' && plainChar <= 'z') {
        const plainCode = plainChar.charCodeAt(0) - 97;
        const keyChar = this._key[keyIndex % this._key.length];
        const shift = keyChar.charCodeAt(0) - 97;
        const encryptedCode = (plainCode + shift) % 26;
        result += String.fromCharCode(encryptedCode + 97);
        keyIndex++;
      } else {
        // For simplicity, keep non-letter characters as is
        result += plainChar;
      }
    }
    
    return result;
  }

  decode(ciphertext: string): string {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < ciphertext.length; i++) {
      const cipherChar = ciphertext[i];
      
      // Only decode lowercase letters
      if (cipherChar >= 'a' && cipherChar <= 'z') {
        const cipherCode = cipherChar.charCodeAt(0) - 97;
        const keyChar = this._key[keyIndex % this._key.length];
        const shift = keyChar.charCodeAt(0) - 97;
        const decryptedCode = (cipherCode - shift + 26) % 26;
        result += String.fromCharCode(decryptedCode + 97);
        keyIndex++;
      } else {
        // Keep non-letter characters as is
        result += cipherChar;
      }
    }
    
    return result;
  }

  private generateRandomKey(): string {
    let key = '';
    for (let i = 0; i < 100; i++) {
      const randomCode = Math.floor(Math.random() * 26) + 97;
      key += String.fromCharCode(randomCode);
    }
    return key;
  }
}