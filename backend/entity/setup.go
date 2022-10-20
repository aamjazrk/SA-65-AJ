package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Employee{},
		&Book{},
		&BookType{},
		&Shelf{},
		&ROLE{},
	)

	db = database
	//password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	//Employee
	E1 := Employee{
		Name:     "Sirinya",
		Password: "zaq1@wsX",
		Email:    "Sirin@gmail.com",
	}
	db.Model(&Employee{}).Create(&E1)
	E2 := Employee{
		Name:     "Attawit",
		Password: "zxvsetabb",
		Email:    "Attawit@example.com",
	}
	db.Model(&Employee{}).Create(&E2)

	//Role
	R1 := ROLE{
		NAME:        "Student",
		BORROW_DAY:  3,
		BOOKROOM_HR: 3,
		BOOKCOM_HR:  4,
	}
	db.Model(&ROLE{}).Create(&R1)
	R2 := ROLE{
		NAME:        "Teacher",
		BORROW_DAY:  7,
		BOOKROOM_HR: 12,
		BOOKCOM_HR:  12,
	}
	db.Model(&ROLE{}).Create(&R2)

	//Shelf
	S1 := Shelf{
		Type:  "SCIENCE",
		Floor: 1,
	}
	db.Model(&Shelf{}).Create(&S1)
	S2 := Shelf{
		Type:  "ENGINEERING",
		Floor: 1,
	}
	db.Model(&Shelf{}).Create(&S2)
	S3 := Shelf{
		Type:  "ENVIRRONMENT",
		Floor: 1,
	}
	db.Model(&Shelf{}).Create(&S3)
	S4 := Shelf{
		Type:  "HISTORY",
		Floor: 1,
	}
	db.Model(&Shelf{}).Create(&S4)
	S5 := Shelf{
		Type:  "FICTION",
		Floor: 2,
	}
	db.Model(&Shelf{}).Create(&S5)
	S6 := Shelf{
		Type:  "FANTASY",
		Floor: 2,
	}
	db.Model(&Shelf{}).Create(&S6)
	S7 := Shelf{
		Type:  "HORROR",
		Floor: 2,
	}
	db.Model(&Shelf{}).Create(&S7)

	//Book Type
	BT1 := BookType{
		Type: "COMPUTER ENGINEERING",
	}
	db.Model(&BookType{}).Create(&BT1)

	BT2 := BookType{
		Type: "ELECTRIC ENGINEERING",
	}
	db.Model(&BookType{}).Create(&BT2)

	BT3 := BookType{
		Type: "SUPERHERO FANTASY",
	}
	db.Model(&BookType{}).Create(&BT3)

	BT4 := BookType{
		Type: "HORROR FICTION",
	}
	db.Model(&BookType{}).Create(&BT4)

	BT5 := BookType{
		Type: "DARK AND GRIMDARK FANTASY",
	}
	db.Model(&BookType{}).Create(&BT5)
	BT6 := BookType{
		Type: "CONTEMPORARY FANTASY",
	}
	db.Model(&BookType{}).Create(&BT6)

	//Book
	db.Model(&Book{}).Create(&Book{
		Name:     "Python 1",
		Employee:      E1,
		Booktype: BT1,
		Shelf:    S2,
		Role:     R1,
		Author:   "Sirin",
		Page:     500,
		Quantity: 20,
		Price:    300,
		Date:     time.Now(),
	})
	db.Model(&Book{}).Create(&Book{
		Name:     "Java",
		Employee:      E2,
		Booktype: BT1,
		Shelf:    S2,
		Role:     R2,
		Author:   "AJ",
		Page:     350,
		Quantity: 10,
		Price:    200,
		Date:     time.Now(),
	})
	//
	// === Query
	//

	// var target Employee
	// db.Model(&Employee{}).Find(&target, db.Where("email = ?", "Sirin@gmail.com"))

	// // var role ROLE
	// // db.Model(&ROLE{}).Find(&role, db.Where("name = ?", "Student"))

	// var book []*Book
	// db.Model(&Book{}).
	// 	Joins("Role").
	// 	Joins("Shelf").
	// 	Joins("Book_type").
	// 	Joins("Employee").
	// 	Find(&book, db.Where("id = ?", target.ID))

	// for _, wl := range book {
	// 	fmt.Printf("book: %v\n", wl.ID)
	// 	fmt.Printf("%v\n", wl.Role.NAME)
	// 	fmt.Printf("%v\n", wl.Shelf.Type)
	// 	fmt.Printf("%v\n", wl.Booktype.Type)
	// 	fmt.Printf("%v\n", wl.Emp.ID)
	// 	fmt.Println("====")
	// }

}
