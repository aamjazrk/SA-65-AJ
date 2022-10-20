package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	Name     string
	Password string 
	Email    string `gorm:"uniqueIndex"`
	// 1 emp ทีได้หลาย book
	Books []Book `gorm:"foreignKey:EmployeeID"`
}

type Book struct {
	gorm.Model
	Name string
	//ทำหน้าที่เป็น FK
	EmployeeID      *uint
	BooktypeID *uint
	ShelfID    *uint
	RoleID     *uint
	//join ให้งายขึ้น
	Employee      Employee  `gorm:"references:id"`
	Booktype BookType `gorm:"references:id"`
	Shelf    Shelf     `gorm:"references:id"`
	Role     Role      `gorm:"references:id"`
	Author   string
	Page     int
	Quantity int
	Price    int
	Date     time.Time
}

type Role struct {
	gorm.Model
	Name       string
	BorrowDay  int
	BookRoomHR int
	BookComHR  int
	Books       []Book `gorm:"foreignKey:RoleID"`
}
type BookType struct {
	gorm.Model
	Type string
	//1 book type มีได้หลาย book
	Books []Book `gorm:"foreignKey:BooktypeID"`
}

type Shelf struct {
	gorm.Model
	Type  string
	Floor uint
	//1 shelf มีได้หลาย book
	Books []Book `gorm:"foreignKey:ShelfID"`
}
