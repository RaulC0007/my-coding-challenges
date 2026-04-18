import java.util.ArrayList;
import java.util.List;

public class LanguageList {
    private final List<String> languages = new ArrayList<>();

    // Task 1: Check if the list is empty
    public boolean isEmpty() {
        return languages.isEmpty();
    }

    // Task 2: Add a language to the list
    public void addLanguage(String language) {
        languages.add(language);
    }

    // Task 3: Remove a language from the list
    public void removeLanguage(String language) {
        languages.remove(language);
    }

    // Task 4: Return the first language in the list
    public String firstLanguage() {
        return languages.get(0);
    }

    // Task 5: Return the number of languages in the list
    public int count() {
        return languages.size();
    }

    // Task 6: Check if a language is in the list
    public boolean containsLanguage(String language) {
        return languages.contains(language);
    }

    // Task 7: Check if the list contains Java or Kotlin (exciting!)
    public boolean isExciting() {
        return languages.contains("Java") || languages.contains("Kotlin");
    }
}