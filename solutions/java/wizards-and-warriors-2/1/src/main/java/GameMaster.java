public class GameMaster {

    // Task 1: Describe a character
    public String describe(Character character) {
        return "You're a level " + character.getLevel() + " " + 
               character.getCharacterClass() + " with " + 
               character.getHitPoints() + " hit points.";
    }

    // Task 2: Describe a destination
    public String describe(Destination destination) {
        return "You've arrived at " + destination.getName() + 
               ", which has " + destination.getInhabitants() + " inhabitants.";
    }

    // Task 3: Describe a travel method
    public String describe(TravelMethod travelMethod) {
        if (travelMethod == TravelMethod.WALKING) {
            return "You're traveling to your destination by walking.";
        } else {
            return "You're traveling to your destination on horseback.";
        }
    }

    // Task 4: Describe character traveling to destination with specific travel method
    public String describe(Character character, Destination destination, TravelMethod travelMethod) {
        return describe(character) + " " + 
               describe(travelMethod) + " " + 
               describe(destination);
    }

    // Task 5: Describe character traveling to destination with default walking method
    public String describe(Character character, Destination destination) {
        return describe(character, destination, TravelMethod.WALKING);
    }
}