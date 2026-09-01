package parsinglogfiles

import (
	"regexp"
	"strings"
)

var validLinePattern = regexp.MustCompile(`^\[(TRC|DBG|INF|WRN|ERR|FTL)\]`)

func IsValidLine(text string) bool {
	return validLinePattern.MatchString(text)
}

var splitPattern = regexp.MustCompile(`<[~*=\-]*>`)

func SplitLogLine(text string) []string {
	return splitPattern.Split(text, -1)
}

var quotedPasswordPattern = regexp.MustCompile(`(?i)"[^"]*password[^"]*"`)

func CountQuotedPasswords(lines []string) int {
	count := 0
	for _, line := range lines {
		if quotedPasswordPattern.MatchString(line) {
			count++
		}
	}
	return count
}

var endOfLinePattern = regexp.MustCompile(`end-of-line\d+`)

func RemoveEndOfLineText(text string) string {
	return endOfLinePattern.ReplaceAllString(text, "")
}

var userNamePattern = regexp.MustCompile(`User\s+(\S+)`)

func TagWithUserName(lines []string) []string {
	result := make([]string, len(lines))
	for i, line := range lines {
		if !strings.Contains(line, "User ") {
			result[i] = line
			continue
		}
		match := userNamePattern.FindStringSubmatch(line)
		result[i] = "[USR] " + match[1] + " " + line
	}
	return result
}