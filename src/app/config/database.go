package config

import (
	"fmt"

	"github.com/Torrent-Web/TorrentWeb-core/src/app/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func DatabaseConfig() {
	dsn := "root:nuclearzzet*779@tcp(127.0.0.1:3306)/torrentweb?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println(err)
	}

	db.AutoMigrate(&models.User{})
	db.Set("gorm:table_options", "ENGINE=Distributed(cluster, default, hits)").AutoMigrate(&models.User{})
	db.Create(&user)
	db.Find(&user, "id = ?", 10)
	var users = []models.User{user1, user2, user3}
	db.Create(&users)
}
