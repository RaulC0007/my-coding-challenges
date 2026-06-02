import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class Ledger {

    // === Configuration Records ===
    private record LocaleConfig(String header, DateTimeFormatter dateFormatter) {}
    private record CurrencyConfig(String symbol) {}

    private static final Map<String, LocaleConfig> LOCALE_CONFIGS = Map.of(
        "en-US", new LocaleConfig(
            "Date       | Description               | Change       ",
            DateTimeFormatter.ofPattern("MM/dd/yyyy")
        ),
        "nl-NL", new LocaleConfig(
            "Datum      | Omschrijving              | Verandering  ",
            DateTimeFormatter.ofPattern("dd/MM/yyyy")
        )
    );

    private static final Map<String, CurrencyConfig> CURRENCY_CONFIGS = Map.of(
        "USD", new CurrencyConfig("$"),
        "EUR", new CurrencyConfig("€")
    );

    // === Public API ===
    public LedgerEntry createLedgerEntry(String date, String description, int change) {
        return new LedgerEntry(LocalDate.parse(date), description, change);
    }

    public String format(String currency, String locale, LedgerEntry[] entries) {
        validateInputs(currency, locale);
        
        LocaleConfig localeConfig = LOCALE_CONFIGS.get(locale);
        CurrencyConfig currencyConfig = CURRENCY_CONFIGS.get(currency);
        
        StringBuilder result = new StringBuilder(localeConfig.header);
        
        // Sort: negatives first by date, then positives by date (preserves original behavior)
        List<LedgerEntry> sorted = sortEntries(entries);
        
        for (LedgerEntry entry : sorted) {
            result.append("\n")
                  .append(formatEntry(entry, localeConfig, currencyConfig, locale));
        }
        
        return result.toString();
    }

    // === Validation ===
    private void validateInputs(String currency, String locale) {
        if (!CURRENCY_CONFIGS.containsKey(currency)) {
            throw new IllegalArgumentException("Invalid currency");
        }
        if (!LOCALE_CONFIGS.containsKey(locale)) {
            throw new IllegalArgumentException("Invalid locale");
        }
    }

    // === Sorting Logic ===
    private List<LedgerEntry> sortEntries(LedgerEntry[] entries) {
        List<LedgerEntry> negatives = new ArrayList<>();
        List<LedgerEntry> positives = new ArrayList<>();
        
        for (LedgerEntry entry : entries) {
            (entry.change < 0 ? negatives : positives).add(entry);
        }
        
        Comparator<LedgerEntry> byDate = Comparator.comparing(LedgerEntry::date);
        negatives.sort(byDate);
        positives.sort(byDate);
        
        List<LedgerEntry> result = new ArrayList<>(negatives);
        result.addAll(positives);
        return result;
    }

    // === Entry Formatting ===
    private String formatEntry(LedgerEntry entry, LocaleConfig localeConfig, 
                               CurrencyConfig currencyConfig, String locale) {
        String date = entry.date.format(localeConfig.dateFormatter);
        String description = truncateDescription(entry.description);
        String amount = formatAmount(entry.change, currencyConfig.symbol, locale);
        
        return String.format("%s | %-25s | %13s", date, description, amount);
    }

    private String truncateDescription(String description) {
        if (description.length() > 25) {
            return description.substring(0, 22) + "...";
        }
        return description;
    }

    private String formatAmount(int cents, String symbol, String locale) {
        boolean isNegative = cents < 0;
        long absolute = Math.abs((long) cents);
        
        String dollars = formatThousands(absolute / 100, locale);
        String centsPart = String.format("%02d", absolute % 100);
        String decimalSep = locale.equals("nl-NL") ? "," : ".";
        
        StringBuilder amount = new StringBuilder();
        
        // Currency symbol placement
        if (locale.equals("nl-NL")) {
            amount.append(symbol).append(" ");
        } else {
            amount.append(symbol);
        }
        
        amount.append(dollars).append(decimalSep).append(centsPart);
        
        // Negative formatting
        if (isNegative) {
            if (locale.equals("en-US")) {
                return "(" + amount + ")";
            } else { // nl-NL
                // Remove symbol, add minus, re-add symbol
                String withoutSymbol = amount.toString().replace(symbol, "").trim();
                return symbol + " -" + withoutSymbol + " ";
            }
        }
        
        // Positive formatting: trailing space
        return amount + (locale.equals("nl-NL") ? " " : " ");
    }

    private String formatThousands(long number, String locale) {
        String separator = locale.equals("nl-NL") ? "." : ",";
        String numStr = Long.toString(number);
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < numStr.length(); i++) {
            if (i > 0 && (numStr.length() - i) % 3 == 0) {
                result.append(separator);
            }
            result.append(numStr.charAt(i));
        }
        return result.toString();
    }

    // === Immutable LedgerEntry ===
    public static class LedgerEntry {
        private final LocalDate date;
        private final String description;
        private final int change;  // Stored as cents (int)

        public LedgerEntry(LocalDate date, String description, int change) {
            this.date = date;
            this.description = description;
            this.change = change;
        }

        // Keep original getter names for test compatibility
        public LocalDate getLocalDate() { return date; }
        public String getDescription() { return description; }
        public int getChange() { return change; }  // Returns cents as int
        
        // Modern accessor methods (optional, for internal use)
        public LocalDate date() { return date; }
        public String description() { return description; }
        public int change() { return change; }
    }
}