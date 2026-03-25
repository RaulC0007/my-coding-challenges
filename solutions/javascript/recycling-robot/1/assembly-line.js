import { ElectronicDevice } from './lib.js';

/**
 * Checks if input is a boolean.
 */
export function isBoolean(value) {
  return typeof value === 'boolean';
}

/**
 * Checks if input is a finite number or bigint.
 */
export function isNumber(value) {
  return (typeof value === 'number' && isFinite(value)) || 
         typeof value === 'bigint';
}

/**
 * Checks if a value is an object.
 */
export function isObject(value) {
  return value !== null && typeof value === 'object';
}

/**
 * Checks if a value is a numeric string.
 */
export function isNumericString(value) {
  return typeof value === 'string' && !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * Checks if an object is an instance of the `ElectronicDevice` class or one of its children.
 */
export function isElectronic(object) {
  return object instanceof ElectronicDevice;
}

/**
 * Checks if a value is a non empty array.
 */
export function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Checks if a value is an empty array.
 */
export function isEmptyArray(value) {
  return Array.isArray(value) && value.length === 0;
}

/**
 * Throws an error if an object is missing an "id" property or method.
 */
export function assertHasId(object) {
  if (!('id' in object)) {
    throw new Error("Object is missing the 'id' property");
  }
}

/**
 * Checks if a value has a "type" property or method.
 */
export function hasType(object) {
  return 'type' in object;
}

/**
 * Checks if a value has an "id" property.
 */
export function hasIdProperty(object) {
  return Object.hasOwn(object, 'id');
}

/**
 * Checks if a value has a defined "type" property.
 */
export function hasDefinedType(object) {
  return 'type' in object && object.type !== undefined;
}