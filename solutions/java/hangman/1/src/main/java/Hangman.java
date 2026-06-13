import io.reactivex.Observable;
import java.util.*;

class Hangman {

    Observable<Output> play(Observable<String> words, Observable<String> letters) {
        Observable<Object[]> events = Observable.merge(
            words.map(w -> new Object[]{"W", w}),
            letters.map(l -> new Object[]{"L", l})
        );

        // Usamos scan para acumular el estado. 
        // scan emite el valor inicial (Output.empty()) primero, así que usamos skip(1) 
        // para ignorarlo y empezar a emitir desde el primer estado real del juego.
        return events.scan(Output.empty(), (state, event) -> {
            if ("W".equals(event[0])) {
                return createInitialState((String) event[1]);
            } else {
                return updateState(state, (String) event[1]);
            }
        }).skip(1);
    }

    private Output createInitialState(String word) {
        StringBuilder discovered = new StringBuilder();
        for (int i = 0; i < word.length(); i++) {
            discovered.append("_");
        }
        return new Output(
            word,
            discovered.toString(),
            Collections.emptySet(),
            Collections.emptySet(),
            Collections.emptyList(),
            Status.PLAYING
        );
    }

    private Output updateState(Output state, String letter) {
        // Si el juego ya terminó, ignoramos las letras restantes
        if (state.status != Status.PLAYING) {
            return state;
        }
        
        // Lanzamos excepción si la letra ya fue jugada
        if (state.guess.contains(letter) || state.misses.contains(letter)) {
            throw new IllegalArgumentException("Letter " + letter + " was already played");
        }

        String word = state.secret;
        Set<String> newGuess = new HashSet<>(state.guess);
        Set<String> newMisses = new HashSet<>(state.misses);
        List<Part> newParts = new ArrayList<>(state.parts);

        if (word.contains(letter)) {
            newGuess.add(letter);
        } else {
            newMisses.add(letter);
            if (newParts.size() < Part.values().length) {
                newParts.add(Part.values()[newParts.size()]);
            }
        }

        Status newStatus = Status.PLAYING;
        if (newParts.size() == Part.values().length) {
            newStatus = Status.LOSS;
        } else {
            boolean won = true;
            for (char c : word.toCharArray()) {
                if (!newGuess.contains(String.valueOf(c))) {
                    won = false;
                    break;
                }
            }
            if (won) {
                newStatus = Status.WIN;
            }
        }

        StringBuilder discovered = new StringBuilder();
        for (char c : word.toCharArray()) {
            if (newGuess.contains(String.valueOf(c))) {
                discovered.append(c);
            } else {
                discovered.append("_");
            }
        }

        return new Output(
            word,
            discovered.toString(),
            newGuess,
            newMisses,
            newParts,
            newStatus
        );
    }
}
