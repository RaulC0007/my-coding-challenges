import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = new char[]{'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};

    private Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    // Task 1: Generate a random planet class
    char randomPlanetClass() {
        int index = random.nextInt(PLANET_CLASSES.length);
        return PLANET_CLASSES[index];
    }

    // Task 2: Generate a random starship registry number (NCC-1000 to NCC-9999)
    String randomShipRegistryNumber() {
        int number = 1000 + random.nextInt(9000); // 9999 - 1000 + 1 = 9000
        return "NCC-" + number;
    }

    // Task 3: Generate a random stardate (41000.0 inclusive to 42000.0 exclusive)
    double randomStardate() {
        return 41000.0 + 1000.0 * random.nextDouble();
    }
}
