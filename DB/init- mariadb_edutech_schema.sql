
-- Create Users Table
CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Student', 'Parent', 'Tutor', 'Admin') NOT NULL,
    parent_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES users(user_id)
);

-- Create Exams Table
CREATE TABLE exams (
    exam_id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Subjects Table
CREATE TABLE subjects (
    subject_id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Topics Table
CREATE TABLE topics (
    topic_id CHAR(36) PRIMARY KEY,
    subject_id CHAR(36) NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    valid_from DATE NOT NULL,
    valid_to DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

-- Create Sub-Topics Table
CREATE TABLE subtopics (
    subtopic_id CHAR(36) PRIMARY KEY,
    topic_id CHAR(36) NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    valid_from DATE NOT NULL,
    valid_to DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);

-- Create Tests Table
CREATE TABLE tests (
    test_id CHAR(36) PRIMARY KEY,
    exam_id CHAR(36),
    subject_id CHAR(36) NOT NULL,
    topic_id CHAR(36),
    subtopic_id CHAR(36),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    created_by CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
    FOREIGN KEY (subtopic_id) REFERENCES subtopics(subtopic_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Create Difficulty Levels Table
CREATE TABLE difficulty_levels (
    difficulty_id INT AUTO_INCREMENT PRIMARY KEY,
    level INT UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Questions Table
CREATE TABLE questions (
    question_id CHAR(36) PRIMARY KEY,
    test_id CHAR(36),
    subject_id CHAR(36) NOT NULL,
    topic_id CHAR(36),
    subtopic_id CHAR(36),
    question_text TEXT NOT NULL,
    options JSON NOT NULL,
    correct_answer VARCHAR(255),
    difficulty_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES tests(test_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
    FOREIGN KEY (subtopic_id) REFERENCES subtopics(subtopic_id),
    FOREIGN KEY (difficulty_id) REFERENCES difficulty_levels(difficulty_id)
);

-- Create Practice Test Configurations Table
CREATE TABLE practice_test_configurations (
    config_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    test_type ENUM('Topic Wise', 'Mixed', 'Mental Arithmetic') NOT NULL,
    is_timed BOOLEAN NOT NULL,
    duration_minutes INT DEFAULT NULL,
    question_count INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Practice Test Topics Table
CREATE TABLE practice_test_topics (
    config_id CHAR(36),
    topic_id CHAR(36),
    all_subtopics BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (config_id, topic_id),
    FOREIGN KEY (config_id) REFERENCES practice_test_configurations(config_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);

-- Create Practice Test Sub-Topics Table
CREATE TABLE practice_test_subtopics (
    config_id CHAR(36),
    topic_id CHAR(36),
    subtopic_id CHAR(36),
    PRIMARY KEY (config_id, topic_id, subtopic_id),
    FOREIGN KEY (config_id) REFERENCES practice_test_configurations(config_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
    FOREIGN KEY (subtopic_id) REFERENCES subtopics(subtopic_id)
);

-- Create Generated Practice Tests Table
CREATE TABLE generated_practice_tests (
    generated_test_id CHAR(36) PRIMARY KEY,
    config_id CHAR(36),
    user_id CHAR(36) NOT NULL,
    exam_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (config_id) REFERENCES practice_test_configurations(config_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
);

-- Create Practice Test Questions Table
CREATE TABLE practice_test_questions (
    test_question_id CHAR(36) PRIMARY KEY,
    generated_test_id CHAR(36),
    question_id CHAR(36),
    sequence_number INT NOT NULL,
    FOREIGN KEY (generated_test_id) REFERENCES generated_practice_tests(generated_test_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

-- Create Indexes for Performance
CREATE INDEX idx_validity_topics ON topics (valid_from, valid_to);
CREATE INDEX idx_validity_subtopics ON subtopics (valid_from, valid_to);
CREATE INDEX idx_user_role ON users (role);
CREATE INDEX idx_test_config_user ON practice_test_configurations (user_id);
