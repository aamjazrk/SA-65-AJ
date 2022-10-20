package main

import (
	"github.com/aamjazrk/week5/controller"
	"github.com/aamjazrk/week5/entity"
	//"github.com/aamjazrk/week5/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	//r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		// router.Use(middlewares.Authorizes())
		{
			// shelf Routes
			router.GET("/shelves", controller.ListShelf)
			router.GET("/shelf/:id", controller.GetShelf)
			router.POST("/shelves", controller.CreateShelf)
			router.PATCH("/shelves", controller.UpdateShelf)
			router.DELETE("/shelves/:id", controller.DeleteShelf)

			// BOOK_TYPE Routes
			router.GET("/book_types", controller.ListBookType)
			router.GET("/book_types/:id", controller.GetBookType)
			router.POST("/book_types", controller.CreateBookType)
			router.PATCH("/book_types", controller.UpdateBookType)
			router.DELETE("/book_types/:id", controller.DeleteBookType)

			// Role Routes
			router.GET("/roles", controller.ListRole)
			router.GET("/roles/:id", controller.GetRole)
			router.POST("/roles", controller.CreateRole)
			router.PATCH("/roles", controller.UpdateRole)
			router.DELETE("/roles/:id", controller.DeleteRole)

			// employee Routes
			router.GET("/employees", controller.ListEmp)
			router.GET("/employees/:id", controller.GetEmp)
			//router.POST("/employees", controller.CreateEmployee)
			router.PATCH("/employees", controller.UpdateEmp)
			router.DELETE("/employees/:id", controller.DeleteEmp)

			// book Routes
			router.GET("/books", controller.ListBook)
			router.GET("/book/:id", controller.GetBook)
			router.POST("/books", controller.CreateBook)
			router.PATCH("/books", controller.UpdateBook)
			router.DELETE("/books/:id", controller.DeleteBook)

		}
	}

	// // Signup User Route
	// r.POST("/signup", controller.CreateUser)
	// // login User Route
	// r.POST("/login", controller.Login)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") //สำหรับใส่ ip server
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
