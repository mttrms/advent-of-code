package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

var solution int = 2020

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println("error reading file")
		log.Fatal(err)
	}
	defer file.Close()

	var Empty struct{}
	nums := make(map[int]struct{})

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		currentNum := scanner.Text()
		i, _ := strconv.Atoi(currentNum)
		nums[i] = Empty

		if checkSolution(nums, i) {
			fmt.Println(i * (solution - i))
			return
		}
	}
}

func checkSolution(numMap map[int]struct{}, currentNum int) bool {
	desiredValue := solution - currentNum
	_, ok := numMap[desiredValue]
	if ok {
		return true
	} else {
		return false
	}
}
