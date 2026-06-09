import java.util.Collections;
import java.util.List;

class RelationshipComputer<T> {
    Relationship computeRelationship(List<T> firstList, List<T> secondList) {
        // 1. Check if both lists are exactly equal in size and content
        if (firstList.equals(secondList)) {
            return Relationship.EQUAL;
        }
        
        // 2. Check if firstList is a contiguous sub-sequence of secondList
        if (Collections.indexOfSubList(secondList, firstList) != -1) {
            return Relationship.SUBLIST;
        }
        
        // 3. Check if secondList is a contiguous sub-sequence of firstList
        if (Collections.indexOfSubList(firstList, secondList) != -1) {
            return Relationship.SUPERLIST;
        }
        
        // 4. If none of the above conditions are met, they are unequal
        return Relationship.UNEQUAL;
    }
}