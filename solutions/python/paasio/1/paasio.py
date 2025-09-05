import io
import socket


class MeteredFile(io.BufferedRandom):
    """Implement using a subclassing model."""

    def __init__(self, *args, **kwargs):
        # Call the parent constructor to properly initialize the file
        super().__init__(*args, **kwargs)
        self._read_bytes = 0
        self._read_ops = 0
        self._write_bytes = 0
        self._write_ops = 0

    def __enter__(self):
        # Do not call super().__enter__()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        # Call the parent's __exit__ to properly clean up
        return super().__exit__(exc_type, exc_val, exc_tb)

    def __iter__(self):
        return self

    def __next__(self):
        line = self.readline()
        if not line:
            raise StopIteration
        return line

    def read(self, size=-1):
        data = super().read(size)
        self._read_bytes += len(data)
        self._read_ops += 1
        return data

    def readline(self, size=-1):
        data = super().readline(size)
        self._read_bytes += len(data)
        self._read_ops += 1
        return data

    @property
    def read_bytes(self):
        return self._read_bytes

    @property
    def read_ops(self):
        return self._read_ops

    def write(self, b):
        bytes_written = super().write(b)
        self._write_bytes += bytes_written
        self._write_ops += 1
        return bytes_written

    @property
    def write_bytes(self):
        return self._write_bytes

    @property
    def write_ops(self):
        return self._write_ops


class MeteredSocket:
    """Implement using a delegation model."""

    def __init__(self, socket):
        self._socket = socket
        self._recv_bytes = 0
        self._recv_ops = 0
        self._send_bytes = 0
        self._send_ops = 0

    def __enter__(self):
        # Do not call the wrapped socket's __enter__
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        # Call the wrapped socket's __exit__ if it exists
        if hasattr(self._socket, '__exit__'):
            return self._socket.__exit__(exc_type, exc_val, exc_tb)
        return False

    def recv(self, bufsize, flags=0):
        data = self._socket.recv(bufsize, flags)
        self._recv_bytes += len(data)
        self._recv_ops += 1
        return data

    @property
    def recv_bytes(self):
        return self._recv_bytes

    @property
    def recv_ops(self):
        return self._recv_ops

    def send(self, data, flags=0):
        bytes_sent = self._socket.send(data, flags)
        self._send_bytes += bytes_sent
        self._send_ops += 1
        return bytes_sent

    @property
    def send_bytes(self):
        return self._send_bytes

    @property
    def send_ops(self):
        return self._send_ops

    # Delegate other socket methods as needed
    def __getattr__(self, name):
        # Delegate any other methods to the wrapped socket
        return getattr(self._socket, name)