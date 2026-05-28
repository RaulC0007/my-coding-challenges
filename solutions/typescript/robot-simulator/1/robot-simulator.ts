export class InvalidInputError extends Error {
  constructor(message: string) {
    super();
    this.message = message || 'Invalid Input';
  }
}

type Direction = 'north' | 'east' | 'south' | 'west';
type Coordinates = [number, number];

export class Robot {
  // Guardamos las direcciones en sentido horario para facilitar los giros
  private readonly directions: Direction[] = ['north', 'east', 'south', 'west'];
  
  private _x = 0;
  private _y = 0;
  private _bearing: Direction = 'north';

  // Getters para consultar el estado actual del robot
  public get bearing(): Direction {
    return this._bearing;
  }

  public get coordinates(): Coordinates {
    return [this._x, this._y];
  }

  /**
   * Inicializa la posición y orientación del robot en la cuadrícula.
   */
  public place({ x, y, direction }: { x: number; y: number; direction: string }): void {
    // Validamos que la dirección provista sea una de las cuatro permitidas
    if (!this.directions.includes(direction as Direction)) {
      throw new InvalidInputError('Invalid robot bearing');
    }
    
    this._x = x;
    this._y = y;
    this._bearing = direction as Direction;
  }

  /**
   * Procesa una cadena secuencial de comandos ('R', 'L', 'A').
   */
  public evaluate(instructions: string): void {
    for (const command of instructions) {
      switch (command) {
        case 'R':
          this.turnRight();
          break;
        case 'L':
          this.turnLeft();
          break;
        case 'A':
          this.advance();
          break;
        default:
          // Si el comando no pertenece al protocolo, disparamos la excepción
          throw new InvalidInputError('Invalid instruction received');
      }
    }
  }

  /**
   * Gira el robot 90 grados a la derecha (sentido horario).
   */
  private turnRight(): void {
    const currentIndex = this.directions.indexOf(this._bearing);
    // Usamos aritmética modular (%) para regresar a 0 si nos salimos del índice 3
    const nextIndex = (currentIndex + 1) % 4;
    this._bearing = this.directions[nextIndex];
  }

  /**
   * Gira el robot 90 grados a la izquierda (sentido antihorario).
   */
  private turnLeft(): void {
    const currentIndex = this.directions.indexOf(this._bearing);
    // Sumamos 3 y aplicamos módulo 4, que equivale matemáticamente a restar 1 de forma segura
    const prevIndex = (currentIndex + 3) % 4;
    this._bearing = this.directions[prevIndex];
  }

  /**
   * Hace avanzar al robot una casilla hacia la dirección que está mirando.
   */
  private advance(): void {
    switch (this._bearing) {
      case 'north':
        this._y += 1;
        break;
      case 'east':
        this._x += 1;
        break;
      case 'south':
        this._y -= 1;
        break;
      case 'west':
        this._x -= 1;
        break;
    }
  }
}