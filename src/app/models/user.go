package models

type UserModel struct {
	ID   int	
	NAME string
	AGE int
}

var Users = []UserModel{
	{ID: 1, NAME: "Niket", AGE: 13},
	{ID: 2, NAME: "Evan", AGE: 14},
	{ID: 3, NAME: "Abhinav", AGE: 14},
	{ID: 4, NAME: "Thomas", AGE: 14},
}