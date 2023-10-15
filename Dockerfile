FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY agendifyapplication/target/*.jar .
ENTRYPOINT ["java", "-jar", "/app/application.jar"]
