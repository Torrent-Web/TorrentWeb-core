package config

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func DatabaseConfig() {
	dsn := "root:nuclearzzet*779@tcp(127.0.0.1:3306)/torrentweb?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("[FAILED] to connect to the database " + err.Error())
	}

	defer db.Close()
}
