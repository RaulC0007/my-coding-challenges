import java.util.List;

class BinarySearch {
    private final List<Integer> items;

    BinarySearch(List<Integer> items) {
        this.items = items;
    }

    int indexOf(int item) throws ValueNotFoundException {
        int left = 0;
        int right = items.size() - 1;

        while (left <= right) {
            // Prevent integer overflow for large lists
            int mid = left + (right - left) / 2;
            int midValue = items.get(mid);

            if (midValue == item) {
                return mid;
            } else if (midValue < item) {
                // Item is in the right half
                left = mid + 1;
            } else {
                // Item is in the left half
                right = mid - 1;
            }
        }

        throw new ValueNotFoundException("Value not in array");
    }
}