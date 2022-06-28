package main

import (
// "github.com/Torrent-Web/TorrentWeb-core/src/api/v1"
)

func apiRoutes() {
	api := Router.Group("api/")

	v1 := api.Group("v1/")

	v1.GET("/users")
}
