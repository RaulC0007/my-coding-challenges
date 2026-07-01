import java.util.ArrayList;

class BuildTree {
    TreeNode buildTree(ArrayList<Record> records) throws InvalidRecordsException {
        // An empty list of records means there is no tree
        if (records == null || records.isEmpty()) {
            return null;
        }

        int n = records.size();
        
        // We use an array for O(1) lookups instead of searching through lists.
        // Since valid IDs are strictly 0 to n-1, the array index perfectly maps to the record ID.
        TreeNode[] nodes = new TreeNode[n];
        int[] parentIds = new int[n];

        // Pass 1: Validate records and create nodes
        for (Record record : records) {
            int id = record.getRecordId();
            int parentId = record.getParentId();

            // 1. Check bounds
            if (id < 0 || id >= n || parentId < 0 || parentId >= n) {
                throw new InvalidRecordsException("Invalid Records");
            }
            
            // 2. Check for duplicate IDs
            if (nodes[id] != null) {
                throw new InvalidRecordsException("Invalid Records");
            }
            
            // 3. Root node validation (ID 0 must have parent ID 0)
            if (id == 0 && parentId != 0) {
                throw new InvalidRecordsException("Invalid Records");
            }
            
            // 4. Non-root nodes must have a parent ID strictly less than their own ID
            if (id != 0 && parentId >= id) {
                throw new InvalidRecordsException("Invalid Records");
            }

            parentIds[id] = parentId;
            nodes[id] = new TreeNode(id);
        }

        // Pass 2: Link children to their parents
        // We start at 1 because the root (index 0) has no parent to link to
        for (int i = 1; i < n; i++) {
            nodes[parentIds[i]].getChildren().add(nodes[i]);
        }

        // The root of the tree is always at index 0
        return nodes[0];
    }
}
