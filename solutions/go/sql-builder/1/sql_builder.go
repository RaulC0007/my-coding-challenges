package sqlbuilder

import "strings"

// ColumnValue represents a single database column and its corresponding value
// to be used in SQL INSERT statements.
type ColumnValue struct {
	Column string
	Value  string
}

// BuildSelectQuery generates a valid SQL SELECT query for the specified table and columns.
// If the columns slice is empty or nil, it defaults to the wildcard "*".
func BuildSelectQuery(table string, columns []string) string {
	var sb strings.Builder
	sb.WriteString("SELECT ")

	if len(columns) == 0 {
		sb.WriteString("*")
	} else {
		for i, col := range columns {
			if i > 0 {
				sb.WriteString(", ")
			}
			sb.WriteString(col)
		}
	}

	sb.WriteString(" FROM ")
	sb.WriteString(table)
	sb.WriteString(";")

	return sb.String()
}

// BuildBatchInserts generates a slice of individual SQL INSERT statements for the provided rows.
// Empty rows are skipped, and values must be enclosed in single quotes.
func BuildBatchInserts(table string, rows [][]ColumnValue) []string {
	var queries []string

	for _, row := range rows {
		// Skip empty rows as per instructions
		if len(row) == 0 {
			continue
		}

		var sb strings.Builder
		sb.WriteString("INSERT INTO ")
		sb.WriteString(table)
		sb.WriteString(" (")

		// Build the columns part
		for i, cv := range row {
			if i > 0 {
				sb.WriteString(", ")
			}
			sb.WriteString(cv.Column)
		}

		sb.WriteString(") VALUES (")

		// Build the values part, wrapping each in single quotes
		for i, cv := range row {
			if i > 0 {
				sb.WriteString(", ")
			}
			sb.WriteString("'")
			sb.WriteString(cv.Value)
			sb.WriteString("'")
		}

		sb.WriteString(");")
		
		// Append the fully constructed query string to our result slice
		queries = append(queries, sb.String())
	}

	return queries
}