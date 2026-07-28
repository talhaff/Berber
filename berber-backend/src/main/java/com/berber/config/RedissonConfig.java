package com.berber.config;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class RedissonConfig {

    @Bean(destroyMethod = "shutdown")
    public RedissonClient redissonClient() throws IOException {
        Config config;
        String redisUrl = System.getenv("REDIS_URL");
        String redisPassword = System.getenv("REDIS_PASSWORD");

        if (redisUrl != null && !redisUrl.isBlank()) {
            config = new Config();
            var serverConfig = config.useSingleServer()
                    .setAddress(redisUrl)
                    .setConnectionMinimumIdleSize(1)
                    .setConnectionPoolSize(5)
                    .setConnectTimeout(10000)
                    .setTimeout(3000)
                    .setRetryAttempts(3)
                    .setRetryInterval(1500);

            if (redisPassword != null && !redisPassword.isBlank()) {
                serverConfig.setPassword(redisPassword);
            }
        } else {
            InputStream is = getClass().getResourceAsStream("/redisson.yml");
            config = Config.fromYAML(is);
        }
        return Redisson.create(config);
    }
}
