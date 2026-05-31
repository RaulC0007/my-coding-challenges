class TwelveDays {
    private static final String[] ORDINALS = {
        "first", "second", "third", "fourth", "fifth", "sixth",
        "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"
    };

    private static final String[] GIFTS = {
        "a Partridge in a Pear Tree",
        "two Turtle Doves",
        "three French Hens",
        "four Calling Birds",
        "five Gold Rings",
        "six Geese-a-Laying",
        "seven Swans-a-Swimming",
        "eight Maids-a-Milking",
        "nine Ladies Dancing",
        "ten Lords-a-Leaping",
        "eleven Pipers Piping",
        "twelve Drummers Drumming"
    };

    String verse(int verseNumber) {
        StringBuilder sb = new StringBuilder();
        sb.append("On the ").append(ORDINALS[verseNumber - 1])
          .append(" day of Christmas my true love gave to me: ");

        // Gifts are listed in reverse order (from current day down to day 1)
        for (int i = verseNumber - 1; i >= 0; i--) {
            // Add "and " before the last gift for verses 2-12
            if (verseNumber > 1 && i == 0) {
                sb.append("and ");
            }
            sb.append(GIFTS[i]);
            
            // Add comma separator between gifts, or period+newline at the end
            if (i == 0) {
                sb.append(".\n");
            } else {
                sb.append(", ");
            }
        }
        return sb.toString();
    }

    String verses(int startVerse, int endVerse) {
        StringBuilder sb = new StringBuilder();
        for (int i = startVerse; i <= endVerse; i++) {
            sb.append(verse(i));
            // Separate verses with a newline (verse() already ends with \n)
            if (i < endVerse) {
                sb.append("\n");
            }
        }
        return sb.toString();
    }
    
    String sing() {
        return verses(1, 12);
    }
}