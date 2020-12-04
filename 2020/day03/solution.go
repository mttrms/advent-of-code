package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

var tobogganSlope = []int{1, 3}

func main() {
	treeMap, err := os.Open("input.txt")
	if err != nil {
		fmt.Println("error reading file")
		log.Fatal(err)
	}
	defer treeMap.Close()

	count := treesCrashedInto(treeMap)
	fmt.Printf("We crashed into %v trees\n", count)
}

func treesCrashedInto(treeMap *os.File) int {
	line := 0
	trees := 0
	location := []int{0, 0}

	scanner := bufio.NewScanner(treeMap)

	for scanner.Scan() {
		if line != location[0] {
			line++
			continue
		}
		line++
		currentLine := scanner.Text()
		x := location[1]

		if isATree(string(currentLine[x])) {
			trees++
		}

		location[0] = (location[0] + tobogganSlope[0])
		location[1] = (location[1] + tobogganSlope[1]) % 31

	}

	return trees
}

func isATree(char string) bool {
	return char == "#"
}
