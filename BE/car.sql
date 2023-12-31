CREATE TABLE Car (
	ID INT IDENTITY(1,1) NOT NULL,
	Make VARCHAR(100) NOT NULL,
	Model VARCHAR(100) NOT NULL,
	[Year] INT NOT NULL
 CONSTRAINT [PK_car] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

iNSERT INTO CAr(make, model, year) values ('bmw', 'xd', 2010)