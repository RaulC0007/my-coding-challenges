class Badge {
    public String print(Integer id, String name, String department) {
        // Handle nullable id: include "[id] - " prefix only if id is not null
        String idPart = (id != null) ? "[" + id + "] - " : "";
        
        // Handle nullable department: uppercase if present, otherwise "OWNER"
        String deptPart = (department != null) ? department.toUpperCase() : "OWNER";
        
        // Combine all parts into final badge label
        return idPart + name + " - " + deptPart;
    }
}