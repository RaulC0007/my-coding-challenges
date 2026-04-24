import java.util.Collection;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

public class Graph {
    // Internal storage for graph components
    private final Map<String, String> attributes;
    private final List<Node> nodes;
    private final List<Edge> edges;

    // Constructor: empty graph
    public Graph() {
        this.attributes = new HashMap<>();
        this.nodes = new ArrayList<>();
        this.edges = new ArrayList<>();
    }

    // Constructor: graph with initial attributes
    public Graph(Map<String, String> attributes) {
        this.attributes = new HashMap<>(attributes);
        this.nodes = new ArrayList<>();
        this.edges = new ArrayList<>();
    }

    // Return unmodifiable view of nodes (encapsulation)
    public Collection<Node> getNodes() {
        return Collections.unmodifiableList(nodes);
    }

    // Return unmodifiable view of edges (encapsulation)
    public Collection<Edge> getEdges() {
        return Collections.unmodifiableList(edges);
    }

    // Return unmodifiable view of attributes (encapsulation)
    public Map<String, String> getAttributes() {
        return Collections.unmodifiableMap(attributes);
    }

    // Fluent builder: add node with no attributes
    public Graph node(String name) {
        nodes.add(new Node(name));
        return this;
    }

    // Fluent builder: add node with attributes
    public Graph node(String name, Map<String, String> attributes) {
        nodes.add(new Node(name, attributes));
        return this;
    }

    // Fluent builder: add edge with no attributes
    public Graph edge(String start, String end) {
        edges.add(new Edge(start, end));
        return this;
    }

    // Fluent builder: add edge with attributes
    public Graph edge(String start, String end, Map<String, String> attributes) {
        edges.add(new Edge(start, end, attributes));
        return this;
    }
}