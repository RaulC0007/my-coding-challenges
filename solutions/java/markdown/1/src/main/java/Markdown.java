class Markdown {

    String parse(String markdown) {
        StringBuilder html = new StringBuilder();
        boolean isInList = false;

        for (String line : markdown.split("\n")) {
            String parsedLine = parseLine(line);
            boolean isListItem = parsedLine.startsWith("<li>");

            // Si entramos en una lista, abrimos la etiqueta <ul>
            if (isListItem && !isInList) {
                html.append("<ul>");
                isInList = true;
            } 
            // Si salimos de una lista, cerramos la etiqueta </ul>
            else if (!isListItem && isInList) {
                html.append("</ul>");
                isInList = false;
            }

            html.append(parsedLine);
        }

        // Cerrar la lista si el documento termina mientras está activa
        if (isInList) {
            html.append("</ul>");
        }

        return html.toString();
    }

    private String parseLine(String line) {
        String header = parseHeader(line);
        if (header != null) return header;

        String listItem = parseListItem(line);
        if (listItem != null) return listItem;

        return parseParagraph(line);
    }

    private String parseHeader(String markdown) {
        int count = 0;
        while (count < markdown.length() && markdown.charAt(count) == '#') {
            count++;
        }

        if (count == 0) return null;
        if (count > 6) return "<p>" + markdown + "</p>";

        return "<h" + count + ">" + markdown.substring(count + 1) + "</h" + count + ">";
    }

    private String parseListItem(String markdown) {
        if (markdown.startsWith("*")) {
            return "<li>" + parseInlineFormatting(markdown.substring(2)) + "</li>";
        }
        return null;
    }

    private String parseParagraph(String markdown) {
        return "<p>" + parseInlineFormatting(markdown) + "</p>";
    }

    private String parseInlineFormatting(String markdown) {
        return markdown
                .replaceAll("__(.+)__", "<strong>$1</strong>")
                .replaceAll("_(.+)_", "<em>$1</em>");
    }
}