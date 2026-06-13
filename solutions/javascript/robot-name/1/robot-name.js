const TOTAL_COMBINATIONS = 676000;
let nameIndices = [];
let currentIndex = 0;

function initializePool() {
  // En lugar de guardar 676,000 strings, guardamos solo números del 0 al 675,999
  nameIndices = new Array(TOTAL_COMBINATIONS);
  for (let i = 0; i < TOTAL_COMBINATIONS; i++) {
    nameIndices[i] = i;
  }

  // Barajamos los números con Fisher-Yates (operación numérica ultrarrápida en memoria)
  for (let i = TOTAL_COMBINATIONS - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = nameIndices[i];
    nameIndices[i] = nameIndices[j];
    nameIndices[j] = temp;
  }

  currentIndex = 0;
}

// Convierte un índice numérico único a su representación de string "AA000" bajo demanda (Lazy)
function decodeName(index) {
  let num = index;
  
  const digit3 = num % 10;
  num = Math.floor(num / 10);
  
  const digit2 = num % 10;
  num = Math.floor(num / 10);
  
  const digit1 = num % 10;
  num = Math.floor(num / 10);
  
  const letter2 = String.fromCharCode(65 + (num % 26));
  num = Math.floor(num / 26);
  
  const letter1 = String.fromCharCode(65 + (num % 26));
  
  return `${letter1}${letter2}${digit1}${digit2}${digit3}`;
}

// Inicialización inicial
initializePool();

export class Robot {
  constructor() {
    this._name = null;
    this.reset();
  }

  get name() {
    return this._name;
  }

  reset() {
    if (currentIndex >= TOTAL_COMBINATIONS) {
      throw new Error('All possible robot names have been exhausted.');
    }
    
    // Decodificamos a string únicamente el nombre que necesitamos usar ahora mismo
    this._name = decodeName(nameIndices[currentIndex]);
    currentIndex++;
  }

  static releaseNames() {
    initializePool();
  }
}