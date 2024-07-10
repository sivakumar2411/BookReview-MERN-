package com.bookreview.bookreview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
    info=@Info(
        title="Book Review",
        version="1.0.0",
        description="BR",
        contact=@Contact(
            name="AshKetchum",
            email="AE"
        )
    )
)

@SpringBootApplication
public class BookreviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookreviewApplication.class, args);
	}

}
