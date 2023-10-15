FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY agendifyapplication/target/*.jar application.jar
ENTRYPOINT ["java", "-jar", "./application.jar"]