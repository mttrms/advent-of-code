package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
  "strings"
	"strconv"
)

type Password struct {
  character string
  maximum int
  minimum int
  password string
}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println("error reading file")
		log.Fatal(err)
	}
	defer file.Close()

  formattedPasswords := formatPasswords(file)
  invalidPasswords := countInvalidPasswords(formattedPasswords)
  validPasswords := len(formattedPasswords) - invalidPasswords

  fmt.Printf("There are %v valid passwords\n", validPasswords)
}

func formatPasswords(file *os.File) []Password {
  var pw []Password
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
    unparsedPw := scanner.Text()
    splitPw := strings.Split(unparsedPw, " ")

    pwRange := strings.Split(splitPw[0], "-")
    pwChar := strings.Trim(splitPw[1], ":")
    password := splitPw[2]
    min, _ := strconv.Atoi(pwRange[0])
    max, _ := strconv.Atoi(pwRange[1])

    var p Password
    p.character = pwChar
    p.maximum = max
    p.minimum = min
    p.password = password

    pw = append(pw, p)
	}

  return pw
}

func isPasswordInvalid(password Password) bool {
  charUsage := strings.Count(password.password, password.character)

  return charUsage < password.minimum || charUsage > password.maximum
}

func countInvalidPasswords(passwords []Password) int {
  i := 0
  for _, pw := range passwords {
    if (isPasswordInvalid(pw)) {
      i++
    }
  }

    return i
}
