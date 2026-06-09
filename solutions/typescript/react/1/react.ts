type EqualFn<T> = (lhs: T, rhs: T) => boolean
type GetterFn<T> = () => T
type SetterFn<T> = (value: T) => T
type UnsubscribeFn = () => void
type UpdateFn<T> = (value?: T) => T

type InputPair<T> = [GetterFn<T>, SetterFn<T>]

type Options = {
  name: string
}

// Interfaces simplificadas y unificadas sin conflictos de tipado obligatorio/opcional
type Observer = {
  name?: string
  dependencies: Set<Subject>
  value: any // Cambiado a obligatorio para evitar el error TS2339 al escribir
  updateFn: UpdateFn<any>
  equalFn?: EqualFn<any>
  depth: number // Mantenemos el control de nivel anti-glitch
}

type Subject = {
  name?: string
  observers: Set<Observer>
  value: any
  equalFn?: EqualFn<any>
}

// Contexto global del módulo reactivo
let activeObserver: Observer | null = null

// Sistema de procesamiento por lotes (Batching) ordenado por profundidad estructural
let isBatching = false
const updateQueue: Observer[] = []

function updateObserver(observer: Observer): void {
  const prev = activeObserver
  activeObserver = observer
  
  // Limpieza dinámica de dependencias anteriores
  for (const dep of observer.dependencies) {
    dep.observers.delete(observer)
  }
  observer.dependencies.clear()
  
  // Compute nuevo valor
  const newValue = observer.updateFn(observer.value)
  observer.value = newValue

  // Recalcular la profundidad real del nodo según sus dependencias activas
  let maxDepDepth = 0
  for (const dep of observer.dependencies) {
    const depAsObserver = dep as unknown as Observer
    if (depAsObserver.depth !== undefined) {
      maxDepDepth = Math.max(maxDepDepth, depAsObserver.depth)
    }
  }
  observer.depth = maxDepDepth + 1
  
  activeObserver = prev
}

function notifyObservers(subject: Subject): void {
  for (const observer of Array.from(subject.observers)) {
    if (!updateQueue.includes(observer)) {
      updateQueue.push(observer)
    }
  }

  if (isBatching) return
  isBatching = true

  while (updateQueue.length > 0) {
    // Ordenamos la cola para garantizar que los padres se ejecuten antes que los hijos
    updateQueue.sort((a, b) => (a.depth || 0) - (b.depth || 0))
    
    const current = updateQueue.shift()!
    const oldValue = current.value
    
    updateObserver(current)

    // Si el valor no cambia bajo su propio criterio de igualdad, frenamos la propagación
    if (current.equalFn && current.equalFn(oldValue, current.value)) {
      continue
    }
  }

  isBatching = false
}

export function createInput<T>(
  value: T,
  equal?: boolean | EqualFn<T>,
  options?: Options
): InputPair<T> {
  const s: Subject = {
    name: options?.name,
    observers: new Set(),
    value,
    equalFn: equal === true ? (a: T, b: T) => a === b : (equal as EqualFn<T> | undefined),
  }

  const read: GetterFn<T> = () => {
    if (activeObserver) {
      s.observers.add(activeObserver)
      activeObserver.dependencies.add(s)
    }
    return s.value
  }

  const write: SetterFn<T> = (nextValue) => {
    if (s.equalFn ? !s.equalFn(s.value, nextValue) : s.value !== nextValue) {
      s.value = nextValue
      notifyObservers(s)
    }
    return s.value
  }

  return [read, write]
}

export function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): GetterFn<T> {
  const equalFn = equal === true ? (a: T, b: T) => a === b : (equal as EqualFn<T> | undefined)

  // Unificamos en un nodo híbrido real para que coincida la profundidad (depth) con las dependencias
  const computedNode: Observer & Subject = {
    name: options?.name,
    observers: new Set(),
    dependencies: new Set(),
    value: value,
    depth: 0,
    equalFn,
    updateFn: (prevValue) => {
      const newValue = updateFn(prevValue)
      
      if (equalFn && computedNode.value !== undefined && equalFn(computedNode.value, newValue)) {
        return computedNode.value
      }

      computedNode.value = newValue
      notifyObservers(computedNode)
      return newValue
    }
  }

  updateObserver(computedNode)

  return () => {
    if (activeObserver && activeObserver !== computedNode) {
      computedNode.observers.add(activeObserver)
      activeObserver.dependencies.add(computedNode)
    }
    return computedNode.value
  }
}

export function createCallback<T>(updateFn: UpdateFn<T>, value?: T): UnsubscribeFn {
  const observer: Observer = {
    dependencies: new Set(),
    depth: 0,
    updateFn: (prevValue) => {
      return updateFn(prevValue)
    },
    value,
    equalFn: undefined,
  }
  
  updateObserver(observer)
  
  return () => {
    for (const dep of observer.dependencies) {
      dep.observers.delete(observer)
    }
    observer.dependencies.clear()
  }
}