package complexnumbers

import "math"

// Number representa un número complejo con una parte real y una imaginaria.
type Number struct {
	real      float64
	imaginary float64
}

// Real devuelve la parte real del número complejo.
func (n Number) Real() float64 {
	return n.real
}

// Imaginary devuelve la parte imaginaria del número complejo.
func (n Number) Imaginary() float64 {
	return n.imaginary
}

// Add suma dos números complejos: (a + bi) + (c + di) = (a + c) + (b + d)i
func (n1 Number) Add(n2 Number) Number {
	return Number{
		real:      n1.real + n2.real,
		imaginary: n1.imaginary + n2.imaginary,
	}
}

// Subtract resta dos números complejos: (a + bi) - (c + di) = (a - c) + (b - d)i
func (n1 Number) Subtract(n2 Number) Number {
	return Number{
		real:      n1.real - n2.real,
		imaginary: n1.imaginary - n2.imaginary,
	}
}

// Multiply multiplica dos números complejos: (a + bi)(c + di) = (ac - bd) + (ad + bc)i
func (n1 Number) Multiply(n2 Number) Number {
	return Number{
		real:      n1.real*n2.real - n1.imaginary*n2.imaginary,
		imaginary: n1.real*n2.imaginary + n1.imaginary*n2.real,
	}
}

// Times multiplica un número complejo por un factor escalar de tipo float64.
func (n Number) Times(factor float64) Number {
	return Number{
		real:      n.real * factor,
		imaginary: n.imaginary * factor,
	}
}

// Divide divide dos números complejos: (a + bi) / (c + di) = [(ac + bd) + (bc - ad)i] / (c^2 + d^2)
func (n1 Number) Divide(n2 Number) Number {
	denominator := n2.real*n2.real + n2.imaginary*n2.imaginary
	return Number{
		real:      (n1.real*n2.real + n1.imaginary*n2.imaginary) / denominator,
		imaginary: (n1.imaginary*n2.real - n1.real*n2.imaginary) / denominator,
	}
}

// Conjugate devuelve el conjugado complejo: a - bi
func (n Number) Conjugate() Number {
	return Number{
		real:      n.real,
		imaginary: -n.imaginary,
	}
}

// Abs devuelve el valor absoluto (módulo) del número complejo: sqrt(a^2 + b^2)
func (n Number) Abs() float64 {
	return math.Hypot(n.real, n.imaginary)
}

// Exp calcula la exponencial de un número complejo: e^(a + bi) = e^a * (cos(b) + sin(b)i)
func (n Number) Exp() Number {
	ea := math.Exp(n.real)
	return Number{
		real:      ea * math.Cos(n.imaginary),
		imaginary: ea * math.Sin(n.imaginary),
	}
}