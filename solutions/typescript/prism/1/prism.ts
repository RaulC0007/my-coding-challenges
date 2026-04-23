// 1. Definición de interfaces (Vital para que el compilador no de error)
interface Prism {
  id: number;
  x: number;
  y: number;
  angle: number;
}

interface Start {
  x: number;
  y: number;
  angle: number;
}

// 2. Función principal
export function findSequence(start: Start, prisms: Prism[]): number[] {
  const result: number[] = [];
  let currentX = start.x;
  let currentY = start.y;
  let currentAngle = start.angle;
  
  const EPSILON = 1e-6;
  const MAX_ITERATIONS = 200; // Suficiente para la mayoría de los retos de secuencias
  const visitedStates = new Set<string>();
  
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    let closestIdx = -1;
    let closestDistance = Infinity;
    
    // Buscamos el prisma más cercano en la dirección actual
    for (let j = 0; j < prisms.length; j++) {
      const dist = calculateDistanceToPrism(currentX, currentY, currentAngle, prisms[j], EPSILON);
      
      if (dist !== null && dist < closestDistance) {
        closestDistance = dist;
        closestIdx = j;
      }
    }
    
    if (closestIdx === -1) break; // El láser se pierde en el espacio
    
    const hitPrism = prisms[closestIdx];
    result.push(hitPrism.id);
    
    // Actualizamos posición y ángulo
    currentX = hitPrism.x;
    currentY = hitPrism.y;
    currentAngle = normalizeAngle(currentAngle + hitPrism.angle);
    
    // Detección de bucles para evitar infinitos
    const stateKey = `${currentX.toFixed(4)},${currentY.toFixed(4)},${currentAngle.toFixed(4)}`;
    if (visitedStates.has(stateKey)) break;
    visitedStates.add(stateKey);
  }
  
  return result;
}

// 3. Lógica de intersección de vectores (Corregida para precisión)
function calculateDistanceToPrism(
  startX: number,
  startY: number,
  angle: number,
  prism: Prism,
  EPSILON: number
): number | null {
  const rad = (angle * Math.PI) / 180;
  const dirX = Math.cos(rad);
  const dirY = Math.sin(rad);

  const dx = prism.x - startX;
  const dy = prism.y - startY;

  // Si estamos en el mismo punto, no hay impacto
  const distSq = dx * dx + dy * dy;
  if (distSq < EPSILON) return null;

  const distance = Math.sqrt(distSq);
  
  // Producto punto para ver si el prisma está en la dirección del rayo
  const dotProduct = (dx * dirX + dy * dirY);
  
  // Verificamos alineación con un margen de tolerancia (1e-4)
  if (dotProduct > 0 && Math.abs(dotProduct - distance) < 1e-4) {
    return distance;
  }

  return null;
}

function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized > 180) normalized -= 360;
  if (normalized <= -180) normalized += 360;
  return normalized;
}