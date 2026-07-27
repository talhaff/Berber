CREATE TABLE IF NOT EXISTS users (
    id          BIGSERIAL PRIMARY KEY,
    full_name   VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(20)  NOT NULL DEFAULT 'STAFF',
    work_start  TIME         NOT NULL DEFAULT '09:00:00',
    work_end    TIME         NOT NULL DEFAULT '20:00:00',
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    version     BIGINT       NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS customers (
    id           BIGSERIAL PRIMARY KEY,
    full_name    VARCHAR(100) NOT NULL,
    phone        VARCHAR(20)  NOT NULL UNIQUE,
    registered_at TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(100)     NOT NULL,
    duration_minutes INTEGER         NOT NULL,
    buffer_minutes  INTEGER          NOT NULL DEFAULT 5,
    price           NUMERIC(10, 2)   NOT NULL,
    is_active       BOOLEAN          NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS appointments (
    id           BIGSERIAL PRIMARY KEY,
    customer_id  BIGINT       NOT NULL REFERENCES customers(id),
    service_id   BIGINT       NOT NULL REFERENCES services(id),
    user_id      BIGINT       NOT NULL REFERENCES users(id),
    start_time   TIMESTAMP    NOT NULL,
    end_time     TIMESTAMP    NOT NULL,
    status       VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    notes        TEXT,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    version      BIGINT       NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_appointments_user_date
    ON appointments (user_id, start_time);

CREATE INDEX IF NOT EXISTS idx_appointments_status
    ON appointments (status);

CREATE INDEX IF NOT EXISTS idx_customers_phone
    ON customers (phone);
