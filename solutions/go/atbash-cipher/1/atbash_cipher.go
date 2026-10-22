package atbashcipher

import "strings"

func Atbash(s string) string {
	var sb strings.Builder
	count := 0

	for _, r := range strings.ToLower(s) {
		if r >= 'a' && r <= 'z' {
			if count > 0 && count%5 == 0 {
				sb.WriteByte(' ')
			}
			sub := 'z' - (r - 'a')
			sb.WriteRune(sub)
			count++
		} else if r >= '0' && r <= '9' {
			if count > 0 && count%5 == 0 {
				sb.WriteByte(' ')
			}
			sb.WriteRune(r)
			count++
		}
	}

	return sb.String()
}