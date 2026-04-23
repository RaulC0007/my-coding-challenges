class Fighter {

    boolean isVulnerable() {
        return true;
    }

    int getDamagePoints(Fighter fighter) {
        return 1;
    }
}

// ✅ Define the Warrior class
class Warrior extends Fighter {
    
    @Override
    public String toString() {
        return "Fighter is a Warrior";
    }
    
    @Override
    boolean isVulnerable() {
        return false;  // Warriors are never vulnerable
    }
    
    @Override
    int getDamagePoints(Fighter target) {
        // 10 damage if target is vulnerable, otherwise 6
        return target.isVulnerable() ? 10 : 6;
    }
}

// ✅ Define the Wizard class
class Wizard extends Fighter {
    private boolean spellPrepared = false;  // Track spell preparation state
    
    @Override
    public String toString() {
        return "Fighter is a Wizard";
    }
    
    void prepareSpell() {
        this.spellPrepared = true;
    }
    
    @Override
    boolean isVulnerable() {
        // Vulnerable ONLY when spell is NOT prepared
        return !spellPrepared;
    }
    
    @Override
    int getDamagePoints(Fighter target) {
        // 12 damage if spell prepared, otherwise 3
        return spellPrepared ? 12 : 3;
    }
}