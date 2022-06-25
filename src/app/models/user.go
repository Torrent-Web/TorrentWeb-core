package models

type UserModel struct {
	ID        uint
	Username  string
	Email     *string
	FirstName string
	LastName  string
	CreatedAt int
	LastLogin int
}
