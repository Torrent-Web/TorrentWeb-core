package main

import (
	"github.com/gin-gonic/gin"
)

var Router = gin.Default()

func main() {

	Router.Run("localhost:8080")
}
