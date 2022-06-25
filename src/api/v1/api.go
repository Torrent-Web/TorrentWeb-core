package v1

import (
	"github.com/Torrent-Web/TorrentWeb-core/src/app/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetMovies(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, models.Users)
}
