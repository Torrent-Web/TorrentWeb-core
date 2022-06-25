package main

import (
	"github.com/Torrent-Web/TorrentWeb-core/src/api/v1"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/api/torrents/movies", v1.GetMovies)

	router.Run("localhost:8080")
}
