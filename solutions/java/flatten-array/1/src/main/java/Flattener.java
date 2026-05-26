import java.util.List;
import java.util.ArrayList;

class Flattener {

    List<Object> flatten(List<?> list) {
        List<Object> result = new ArrayList<>();
        
        for (Object element : list) {
            if (element == null) {
                // Skip null values entirely
                continue;
            } else if (element instanceof List) {
                // Recursively flatten nested lists
                result.addAll(flatten((List<?>) element));
            } else {
                // Add primitive/wrapper values directly
                result.add(element);
            }
        }
        
        return result;
    }
}