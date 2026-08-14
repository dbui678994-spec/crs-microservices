package com.example.registrationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class RegistrationServiceApplication {

    public static void main(String[] args) {
        
        System.setProperty("http.nonProxyHosts", "localhost|127.0.0.1");

        SpringApplication.run(
                RegistrationServiceApplication.class,
                args
        );
    }
}