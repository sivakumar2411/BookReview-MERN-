FROM maven:3.8.5-openjdk-21 AS build
COPY . .
RUN mvn clean package -DskipTests
FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/bookreview-0.0.1-SNAPSHOT.jar bookreview.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","bookreview.jar"]