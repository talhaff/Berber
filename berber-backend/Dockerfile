# 1. Aşama: Derleme (Build)
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Dependency önbellekleme
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Kaynak kodları kopyala ve Jar oluştur
COPY src ./src
RUN mvn clean package -DskipTests

# 2. Aşama: Çalıştırma (Runtime)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Duser.timezone=Europe/Istanbul", "-jar", "app.jar"]
