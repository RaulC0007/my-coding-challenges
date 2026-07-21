import java.util.Arrays;

class CircularBuffer<T> {
    private final Object[] buffer;
    private final int capacity;
    private int size;
    private int readIndex;
    private int writeIndex;

    CircularBuffer(final int size) {
        this.capacity = size;
        this.buffer = new Object[size];
        this.size = 0;
        this.readIndex = 0;
        this.writeIndex = 0;
    }

    @SuppressWarnings("unchecked")
    T read() throws BufferIOException {
        if (size == 0) {
            // 🔧 FIX: Updated message to match test expectations exactly
            throw new BufferIOException("Tried to read from empty buffer");
        }
        T data = (T) buffer[readIndex];
        buffer[readIndex] = null; // Clear reference to allow garbage collection
        readIndex = (readIndex + 1) % capacity;
        size--;
        return data;
    }

    void write(T data) throws BufferIOException {
        if (size == capacity) {
            // 🔧 FIX: Updated message to match test expectations exactly
            throw new BufferIOException("Tried to write to full buffer");
        }
        buffer[writeIndex] = data;
        writeIndex = (writeIndex + 1) % capacity;
        size++;
    }

    void overwrite(T data) {
        if (size == capacity) {
            // If full, writeIndex is exactly at the oldest element (readIndex)
            buffer[writeIndex] = data;
            writeIndex = (writeIndex + 1) % capacity;
            readIndex = (readIndex + 1) % capacity; // The next element becomes the oldest
        } else {
            // If not full, behave exactly like a normal write
            buffer[writeIndex] = data;
            writeIndex = (writeIndex + 1) % capacity;
            size++;
        }
    }

    void clear() {
        size = 0;
        readIndex = 0;
        writeIndex = 0;
        Arrays.fill(buffer, null);
    }
}