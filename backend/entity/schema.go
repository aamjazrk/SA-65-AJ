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
	Books []Book `gorm:"foreignKey:Employee_ID"`
}

type Book struct {
	gorm.Model
	Name string
	//ทำหน้าที่เป็น FK
	Employee_ID      *uint
	Booktype_ID *uint
	Shelf_ID    *uint
	ROLE_ID     *uint
	//join ให้งายขึ้น
	Employee      Employee  `gorm:"references:id"`
	Booktype BookType `gorm:"references:id"`
	Shelf    Shelf     `gorm:"references:id"`
	Role     ROLE      `gorm:"references:id"`
	Author   string
	Page     int
	Quantity int
	Price    int
	Date     time.Time
}

type ROLE struct {
	gorm.Model
	NAME        string
	BORROW_DAY  int
	BOOKROOM_HR int
	BOOKCOM_HR  int
	Books       []Book `gorm:"foreignKey:ROLE_ID"`
}
type BookType struct {
	gorm.Model
	Type string
	//1 book type มีได้หลาย book
	Books []Book `gorm:"foreignKey:Booktype_ID"`
}

type Shelf struct {
	gorm.Model
	Type  string
	Floor uint
	//1 shelf มีได้หลาย book
	Books []Book `gorm:"foreignKey:Shelf_ID"`
}
