import java.util.*;

public class Prism {

    public record LaserInfo(double x, double y, double angle) {
    }

    public record PrismInfo(int id, double x, double y, double angle) {
    }

    public static List<Integer> findSequence(LaserInfo laser, List<PrismInfo> prisms) {
        List<Integer> sequence = new ArrayList<>();
        double cx = laser.x();
        double cy = laser.y();
        double currentAngle = laser.angle();

        // Safety limit for complex paths with revisits
        int maxSteps = prisms.size() * 5 + 50;
        int steps = 0;
        
        // Tolerances for floating-point comparisons
        final double DIST_EPS = 1e-9;      // For position equality
        final double CROSS_EPS = 1e-3;     // For collinearity (perpendicular distance)
        final double DOT_EPS = 1e-9;       // For forward direction check

        while (steps < maxSteps) {
            double rad = Math.toRadians(currentAngle);
            double cosA = Math.cos(rad);
            double sinA = Math.sin(rad);

            double minDist = Double.MAX_VALUE;
            PrismInfo nextPrism = null;

            for (PrismInfo p : prisms) {
                double dx = p.x() - cx;
                double dy = p.y() - cy;
                
                // Distance from current position to prism
                double dist = Math.hypot(dx, dy);
                
                // Skip if prism is essentially at current position (avoid immediate re-hit)
                if (dist < DIST_EPS) {
                    continue;
                }

                // Cross product: perpendicular distance from ray line
                // Use relative tolerance: allow larger absolute error for distant prisms
                double cross = Math.abs(dx * sinA - dy * cosA);
                double relativeCross = cross / Math.max(1.0, dist);
                
                if (relativeCross > CROSS_EPS) {
                    continue;
                }

                // Dot product: distance along ray direction (must be positive = forward)
                double dot = dx * cosA + dy * sinA;
                if (dot < DOT_EPS) {
                    continue;
                }

                // Track closest valid prism (dot product = distance along ray for unit direction)
                if (dot < minDist) {
                    minDist = dot;
                    nextPrism = p;
                }
            }

            // No more prisms on current path
            if (nextPrism == null) {
                break;
            }

            sequence.add(nextPrism.id());
            cx = nextPrism.x();
            cy = nextPrism.y();
            currentAngle += nextPrism.angle();
            steps++;
        }

        return sequence;
    }
}