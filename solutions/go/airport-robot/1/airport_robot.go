package airportrobot

// Greeter is an interface that defines the methods needed for a language greeter.
type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

// SayHello accepts a visitor's name and anything that implements the Greeter interface,
// and returns a greeting string in the appropriate language.
func SayHello(name string, greeter Greeter) string {
	return "I can speak " + greeter.LanguageName() + ": " + greeter.Greet(name)
}

// Italian implements the Greeter interface for Italian language.
type Italian struct{}

// LanguageName returns the name of the language.
func (Italian) LanguageName() string {
	return "Italian"
}

// Greet returns a greeting in Italian.
func (Italian) Greet(name string) string {
	return "Ciao " + name + "!"
}

// Portuguese implements the Greeter interface for Portuguese language.
type Portuguese struct{}

// LanguageName returns the name of the language.
func (Portuguese) LanguageName() string {
	return "Portuguese"
}

// Greet returns a greeting in Portuguese.
func (Portuguese) Greet(name string) string {
	return "Olá " + name + "!"
}