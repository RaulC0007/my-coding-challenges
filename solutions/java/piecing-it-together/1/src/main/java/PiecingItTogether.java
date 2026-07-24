import java.util.Optional;
import java.util.OptionalDouble;
import java.util.OptionalInt;

public class PiecingItTogether {

    public static JigsawInfo getCompleteInformation(JigsawInfo input) {
        // 1. Extract known values
        Integer pPieces = input.getPieces().isPresent() ? input.getPieces().getAsInt() : null;
        Integer pBorder = input.getBorder().isPresent() ? input.getBorder().getAsInt() : null;
        Integer pInside = input.getInside().isPresent() ? input.getInside().getAsInt() : null;
        Integer pRows = input.getRows().isPresent() ? input.getRows().getAsInt() : null;
        Integer pCols = input.getColumns().isPresent() ? input.getColumns().getAsInt() : null;
        Double pRatio = input.getAspectRatio().isPresent() ? input.getAspectRatio().getAsDouble() : null;
        String pFormat = input.getFormat().isPresent() ? input.getFormat().get() : null;

        // 2. Determine search space limits
        int searchLimit = 10000; // Safe upper bound
        
        if (pPieces == null && pBorder == null && pInside == null && pRows == null && pCols == null) {
             throw new IllegalArgumentException("Insufficient data");
        }

        JigsawInfo result = null;
        int solutionsFound = 0;

        for (int r = 1; r <= searchLimit; r++) {
            for (int c = 1; c <= searchLimit; c++) {
                
                // Pruning: if r*c exceeds known pieces, break inner loop
                if (pPieces != null && r * c > pPieces) break;
                if (pPieces != null && r * c < pPieces) continue; 
                
                // Calculate properties for this r, c
                int pieces = r * c;
                int border;
                if (r == 1 || c == 1) {
                    border = pieces; 
                } else {
                    border = 2 * r + 2 * c - 4;
                }
                int inside = pieces - border;
                double ratio = (double) c / r;
                String format;
                if (Math.abs(ratio - 1.0) < 1e-9) format = "square";
                else if (ratio < 1.0) format = "portrait";
                else format = "landscape";

                // Check against all provided constraints
                boolean match = true;
                
                if (pPieces != null && pieces != pPieces) match = false;
                if (pBorder != null && border != pBorder) match = false;
                if (pInside != null && inside != pInside) match = false;
                if (pRows != null && r != pRows) match = false;
                if (pCols != null && c != pCols) match = false;
                if (pRatio != null && Math.abs(ratio - pRatio) > 1e-4) match = false;
                if (pFormat != null && !format.equals(pFormat)) match = false;

                if (match) {
                    solutionsFound++;
                    if (solutionsFound > 1) {
                        throw new IllegalArgumentException("Insufficient data");
                    }
                    
                    // Build result
                    JigsawInfo.Builder builder = new JigsawInfo.Builder();
                    builder.pieces(pieces);
                    builder.border(border);
                    builder.inside(inside);
                    builder.rows(r);
                    builder.columns(c);
                    builder.aspectRatio(ratio);
                    builder.format(format);
                    result = builder.build();
                }
                
                // Optimization: If we know pieces, and c is increasing, r*c will only grow.
                if (pPieces != null && r * c == pPieces) break; 
            }
        }

        if (solutionsFound == 0) {
            throw new IllegalArgumentException("Contradictory data");
        }
        
        return result;
    }
}