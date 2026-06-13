import java.util.ArrayList;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Predicate;

class ListOps {

    static <T> List<T> append(List<T> list1, List<T> list2) {
        List<T> result = new ArrayList<>();
        for (T item : list1) {
            result.add(item);
        }
        for (T item : list2) {
            result.add(item);
        }
        return result;
    }

    static <T> List<T> concat(List<List<T>> listOfLists) {
        List<T> result = new ArrayList<>();
        for (List<T> list : listOfLists) {
            for (T item : list) {
                result.add(item);
            }
        }
        return result;
    }

    static <T> List<T> filter(List<T> list, Predicate<T> predicate) {
        List<T> result = new ArrayList<>();
        for (T item : list) {
            if (predicate.test(item)) {
                result.add(item);
            }
        }
        return result;
    }

    static <T> int size(List<T> list) {
        int count = 0;
        for (T item : list) {
            count++;
        }
        return count;
    }

    static <T, U> List<U> map(List<T> list, Function<T, U> transform) {
        List<U> result = new ArrayList<>();
        for (T item : list) {
            result.add(transform.apply(item));
        }
        return result;
    }

    static <T> List<T> reverse(List<T> list) {
        // First, copy elements to a new ArrayList to ensure O(1) random access
        List<T> result = new ArrayList<>();
        for (T item : list) {
            result.add(item);
        }
        // Then, swap elements in-place from the outside in
        int left = 0;
        int right = result.size() - 1;
        while (left < right) {
            T temp = result.get(left);
            result.set(left, result.get(right));
            result.set(right, temp);
            left++;
            right--;
        }
        return result;
    }

    static <T, U> U foldLeft(List<T> list, U initial, BiFunction<U, T, U> f) {
        U acc = initial;
        for (T item : list) {
            acc = f.apply(acc, item);
        }
        return acc;
    }

    static <T, U> U foldRight(List<T> list, U initial, BiFunction<T, U, U> f) {
        // Copy to an ArrayList first to avoid O(N^2) time complexity 
        // if the input list is a LinkedList (which has slow random access).
        List<T> arrayList = new ArrayList<>();
        for (T item : list) {
            arrayList.add(item);
        }
        
        U acc = initial;
        for (int i = arrayList.size() - 1; i >= 0; i--) {
            acc = f.apply(arrayList.get(i), acc);
        }
        return acc;
    }

    private ListOps() {
        // No instances.
    }

}