-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICES', 'FILL_IN_THE_BLANK', 'MULTIPLE_CHOICE_FORK');

-- CreateTable
CREATE TABLE "t_user" (
    "id" SERIAL NOT NULL,
    "auth0_id" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL DEFAULT 'default',
    "full_name" VARCHAR(255) NOT NULL,
    "picture" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "first_login" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_intl_exam" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_intl_exam_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_intl_exam_reponse" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "score" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "start_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "duration" TEXT,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "finished_at" TIMESTAMP(3),

    CONSTRAINT "PK_intl_exam_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_listening" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "page1" TEXT NOT NULL,
    "page2" TEXT NOT NULL,
    "page3" TEXT NOT NULL,
    "page4" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_listening_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_listening_answer" (
    "id" SERIAL NOT NULL,
    "listening_id" INTEGER NOT NULL,
    "description" TEXT,
    "a1" TEXT NOT NULL,
    "a2" TEXT NOT NULL,
    "a3" TEXT NOT NULL,
    "a4" TEXT NOT NULL,
    "a5" TEXT NOT NULL,
    "a6" TEXT NOT NULL,
    "a7" TEXT NOT NULL,
    "a8" TEXT NOT NULL,
    "a9" TEXT NOT NULL,
    "a10" TEXT NOT NULL,
    "a11" TEXT NOT NULL,
    "a12" TEXT NOT NULL,
    "a13" TEXT NOT NULL,
    "a14" TEXT NOT NULL,
    "a15" TEXT NOT NULL,
    "a16" TEXT NOT NULL,
    "a17" TEXT NOT NULL,
    "a18" TEXT NOT NULL,
    "a19" TEXT NOT NULL,
    "a20" TEXT NOT NULL,
    "a21" TEXT NOT NULL,
    "a22" TEXT NOT NULL,
    "a23" TEXT NOT NULL,
    "a24" TEXT NOT NULL,
    "a25" TEXT NOT NULL,
    "a26" TEXT NOT NULL,
    "a27" TEXT NOT NULL,
    "a28" TEXT NOT NULL,
    "a29" TEXT NOT NULL,
    "a30" TEXT NOT NULL,
    "a31" TEXT NOT NULL,
    "a32" TEXT NOT NULL,
    "a33" TEXT NOT NULL,
    "a34" TEXT NOT NULL,
    "a35" TEXT NOT NULL,
    "a36" TEXT NOT NULL,
    "a37" TEXT NOT NULL,
    "a38" TEXT NOT NULL,
    "a39" TEXT NOT NULL,
    "a40" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_listening_answer_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_listening_response" (
    "id" SERIAL NOT NULL,
    "listening_answer_id" INTEGER NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "a1" TEXT,
    "a2" TEXT,
    "a3" TEXT,
    "a4" TEXT,
    "a5" TEXT,
    "a6" TEXT,
    "a7" TEXT,
    "a8" TEXT,
    "a9" TEXT,
    "a10" TEXT,
    "a11" TEXT,
    "a12" TEXT,
    "a13" TEXT,
    "a14" TEXT,
    "a15" TEXT,
    "a16" TEXT,
    "a17" TEXT,
    "a18" TEXT,
    "a19" TEXT,
    "a20" TEXT,
    "a21" TEXT,
    "a22" TEXT,
    "a23" TEXT,
    "a24" TEXT,
    "a25" TEXT,
    "a26" TEXT,
    "a27" TEXT,
    "a28" TEXT,
    "a29" TEXT,
    "a30" TEXT,
    "a31" TEXT,
    "a32" TEXT,
    "a33" TEXT,
    "a34" TEXT,
    "a35" TEXT,
    "a36" TEXT,
    "a37" TEXT,
    "a38" TEXT,
    "a39" TEXT,
    "a40" TEXT,
    "score" TEXT NOT NULL,
    "is_analyzed" BOOLEAN NOT NULL DEFAULT false,
    "analyzed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_listening_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_reading" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "page1" TEXT NOT NULL,
    "page2" TEXT NOT NULL,
    "page3" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_reading_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_reading_answer" (
    "id" SERIAL NOT NULL,
    "reading_id" INTEGER NOT NULL,
    "description" TEXT,
    "a1" TEXT NOT NULL,
    "a2" TEXT NOT NULL,
    "a3" TEXT NOT NULL,
    "a4" TEXT NOT NULL,
    "a5" TEXT NOT NULL,
    "a6" TEXT NOT NULL,
    "a7" TEXT NOT NULL,
    "a8" TEXT NOT NULL,
    "a9" TEXT NOT NULL,
    "a10" TEXT NOT NULL,
    "a11" TEXT NOT NULL,
    "a12" TEXT NOT NULL,
    "a13" TEXT NOT NULL,
    "a14" TEXT NOT NULL,
    "a15" TEXT NOT NULL,
    "a16" TEXT NOT NULL,
    "a17" TEXT NOT NULL,
    "a18" TEXT NOT NULL,
    "a19" TEXT NOT NULL,
    "a20" TEXT NOT NULL,
    "a21" TEXT NOT NULL,
    "a22" TEXT NOT NULL,
    "a23" TEXT NOT NULL,
    "a24" TEXT NOT NULL,
    "a25" TEXT NOT NULL,
    "a26" TEXT NOT NULL,
    "a27" TEXT NOT NULL,
    "a28" TEXT NOT NULL,
    "a29" TEXT NOT NULL,
    "a30" TEXT NOT NULL,
    "a31" TEXT NOT NULL,
    "a32" TEXT NOT NULL,
    "a33" TEXT NOT NULL,
    "a34" TEXT NOT NULL,
    "a35" TEXT NOT NULL,
    "a36" TEXT NOT NULL,
    "a37" TEXT NOT NULL,
    "a38" TEXT NOT NULL,
    "a39" TEXT NOT NULL,
    "a40" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_reading_answer_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_reading_response" (
    "id" SERIAL NOT NULL,
    "reading_answer_id" INTEGER NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "a1" TEXT,
    "a2" TEXT,
    "a3" TEXT,
    "a4" TEXT,
    "a5" TEXT,
    "a6" TEXT,
    "a7" TEXT,
    "a8" TEXT,
    "a9" TEXT,
    "a10" TEXT,
    "a11" TEXT,
    "a12" TEXT,
    "a13" TEXT,
    "a14" TEXT,
    "a15" TEXT,
    "a16" TEXT,
    "a17" TEXT,
    "a18" TEXT,
    "a19" TEXT,
    "a20" TEXT,
    "a21" TEXT,
    "a22" TEXT,
    "a23" TEXT,
    "a24" TEXT,
    "a25" TEXT,
    "a26" TEXT,
    "a27" TEXT,
    "a28" TEXT,
    "a29" TEXT,
    "a30" TEXT,
    "a31" TEXT,
    "a32" TEXT,
    "a33" TEXT,
    "a34" TEXT,
    "a35" TEXT,
    "a36" TEXT,
    "a37" TEXT,
    "a38" TEXT,
    "a39" TEXT,
    "a40" TEXT,
    "score" TEXT NOT NULL,
    "is_analyzed" BOOLEAN NOT NULL DEFAULT false,
    "analyzed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_reading_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_writing" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "page1" TEXT NOT NULL,
    "type1" TEXT NOT NULL DEFAULT 'default',
    "link1" TEXT,
    "page2" TEXT NOT NULL,
    "type2" TEXT NOT NULL DEFAULT 'default',
    "link2" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_writing_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_writing_response" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "essay1" TEXT NOT NULL,
    "essay2" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "is_analyzed" BOOLEAN NOT NULL DEFAULT false,
    "analyzed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_writing_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_speaking" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "page1_1" TEXT NOT NULL,
    "page1_1_link" TEXT NOT NULL,
    "page1_2" TEXT NOT NULL,
    "page1_2_link" TEXT NOT NULL,
    "page1_3" TEXT NOT NULL,
    "page1_3_link" TEXT NOT NULL,
    "page1_4" TEXT,
    "page1_4_link" TEXT,
    "page1_5" TEXT,
    "page1_5_link" TEXT,
    "page1_6" TEXT,
    "page1_6_link" TEXT,
    "page2" TEXT NOT NULL,
    "page3_1" TEXT NOT NULL,
    "page3_1_link" TEXT NOT NULL,
    "page3_2" TEXT NOT NULL,
    "page3_2_link" TEXT NOT NULL,
    "page3_3" TEXT NOT NULL,
    "page3_3_link" TEXT NOT NULL,
    "page3_4" TEXT,
    "page3_4_link" TEXT,
    "page3_5" TEXT,
    "page3_5_link" TEXT,
    "page3_6" TEXT,
    "page3_6_link" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_speaking_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_speaking_response" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "q1_1_link" TEXT NOT NULL,
    "q1_2_link" TEXT NOT NULL,
    "q1_3_link" TEXT NOT NULL,
    "q1_4_link" TEXT,
    "q1_5_link" TEXT,
    "q1_6_link" TEXT,
    "q2_link" TEXT NOT NULL,
    "q3_1_link" TEXT NOT NULL,
    "q3_2_link" TEXT NOT NULL,
    "q3_3_link" TEXT NOT NULL,
    "q3_4_link" TEXT,
    "q3_5_link" TEXT,
    "q3_6_link" TEXT,
    "score" TEXT NOT NULL,
    "is_analyzed" BOOLEAN NOT NULL DEFAULT false,
    "analyzed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_speaking_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_question" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "levels" TEXT[],
    "topic" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_question_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_general_test_english" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "format" TEXT NOT NULL,
    "levels" TEXT[],
    "duration" INTEGER NOT NULL DEFAULT 900,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_general_test_english_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_question_on_general_test_english" (
    "question_id" INTEGER NOT NULL,
    "general_test_english_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_question_on_general_test_english_pkey" PRIMARY KEY ("general_test_english_id","question_id")
);

-- CreateTable
CREATE TABLE "t_test_response_english" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "test_id" INTEGER NOT NULL,
    "total_question" INTEGER NOT NULL,
    "total_sumbitted" INTEGER NOT NULL DEFAULT 0,
    "total_correct" INTEGER NOT NULL DEFAULT 0,
    "total_incorrect" INTEGER NOT NULL DEFAULT 0,
    "factor" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentage" TEXT,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "finished_at" TIMESTAMP(6),
    "time_took_sec" INTEGER,
    "time_took" TEXT,
    "finish_before" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_question_response_english" (
    "id" SERIAL NOT NULL,
    "response" TEXT NOT NULL,
    "is_correct" BOOLEAN,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "general_test_english_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "test_response_english_id" INTEGER NOT NULL,

    CONSTRAINT "PK_english_question_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_general_exam" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "format" TEXT NOT NULL,
    "levels" TEXT[],
    "duration" INTEGER NOT NULL DEFAULT 900,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "description_blocks" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_general_exam" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_exam_question" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "levels" TEXT[],
    "topic" TEXT NOT NULL,
    "text" TEXT,
    "index" INTEGER NOT NULL,
    "index_to_show" TEXT NOT NULL,
    "sub_index_type" TEXT DEFAULT 'alphabetic',
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "combination_keys" TEXT[],
    "combination_values" TEXT[],
    "combinations_answers" JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_exam_question_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_question_on_general_exam" (
    "exam_question_id" INTEGER NOT NULL,
    "general_exam_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_question_on_general_exam_pkey" PRIMARY KEY ("general_exam_id","exam_question_id")
);

-- CreateTable
CREATE TABLE "t_general_exam_response" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "test_id" INTEGER NOT NULL,
    "total_question" INTEGER NOT NULL,
    "total_sumbitted" INTEGER NOT NULL DEFAULT 0,
    "total_correct" INTEGER NOT NULL DEFAULT 0,
    "total_incorrect" INTEGER NOT NULL DEFAULT 0,
    "factor" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentage" TEXT,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "finished_at" TIMESTAMP(6),
    "time_took_sec" INTEGER,
    "time_took" TEXT,
    "finish_before" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_general_exam_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_general_exam_question_response" (
    "id" SERIAL NOT NULL,
    "response" TEXT NOT NULL,
    "is_correct" BOOLEAN,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "general_exam_id" INTEGER NOT NULL,
    "exam_question_id" INTEGER NOT NULL,
    "general_exam_response_id" INTEGER NOT NULL,

    CONSTRAINT "PK_general_exam_question_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_ielts_academy" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ielts_academy_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_course" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_course_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_lesson" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_lesson_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_course_question" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "choices" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_course_question_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_course_lesson_response" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_lesson_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_question_response" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "question_id" INTEGER NOT NULL,
    "course_lesson_response_id" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "is_correct" BOOLEAN,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_question_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "duration" INTEGER NOT NULL DEFAULT 7200,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "total_points" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_part" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "order" INTEGER NOT NULL,
    "english_test_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_part_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_section" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "english_test_part_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_section_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_task" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "should_index" BOOLEAN NOT NULL,
    "english_test_section_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_task_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_task_match" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "english_test_section_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_english_test_task_match_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_question_match" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "matcher" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 1,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_question_match_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_task_multiple_blank" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "english_test_section_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_task_multiple_blank_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_multiple_blank_question" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "points" INTEGER NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL,
    "english_test_task_multiple_blank_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_multiple_blank_question_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_question" (
    "id" SERIAL NOT NULL,
    "type" "QuestionType" NOT NULL,
    "content" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "points" INTEGER NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_question_id" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "t_user_auth0_id_key" ON "t_user"("auth0_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_user_phone_key" ON "t_user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "t_user_email_key" ON "t_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "t_listening_exam_id_key" ON "t_listening"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_listening_answer_listening_id_key" ON "t_listening_answer"("listening_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_listening_response_exam_id_key" ON "t_listening_response"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_reading_exam_id_key" ON "t_reading"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_reading_answer_reading_id_key" ON "t_reading_answer"("reading_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_reading_response_exam_id_key" ON "t_reading_response"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_writing_exam_id_key" ON "t_writing"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_writing_response_exam_id_key" ON "t_writing_response"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_speaking_exam_id_key" ON "t_speaking"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_speaking_response_exam_id_key" ON "t_speaking_response"("exam_id");

-- AddForeignKey
ALTER TABLE "t_intl_exam_reponse" ADD CONSTRAINT "t_intl_exam_reponse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_user"("auth0_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_intl_exam_reponse" ADD CONSTRAINT "t_intl_exam_reponse_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "t_listening" ADD CONSTRAINT "t_listening_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_listening_answer" ADD CONSTRAINT "t_listening_answer_listening_id_fkey" FOREIGN KEY ("listening_id") REFERENCES "t_listening"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_listening_response" ADD CONSTRAINT "t_listening_response_listening_answer_id_fkey" FOREIGN KEY ("listening_answer_id") REFERENCES "t_listening_answer"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_listening_response" ADD CONSTRAINT "t_listening_response_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam_reponse"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_reading" ADD CONSTRAINT "t_reading_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_reading_answer" ADD CONSTRAINT "t_reading_answer_reading_id_fkey" FOREIGN KEY ("reading_id") REFERENCES "t_reading"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_reading_response" ADD CONSTRAINT "t_reading_response_reading_answer_id_fkey" FOREIGN KEY ("reading_answer_id") REFERENCES "t_reading_answer"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_reading_response" ADD CONSTRAINT "t_reading_response_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam_reponse"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_writing" ADD CONSTRAINT "t_writing_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_writing_response" ADD CONSTRAINT "t_writing_response_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam_reponse"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_speaking" ADD CONSTRAINT "t_speaking_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_speaking_response" ADD CONSTRAINT "t_speaking_response_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "t_intl_exam_reponse"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_question_on_general_test_english" ADD CONSTRAINT "t_question_on_general_test_english_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "t_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_question_on_general_test_english" ADD CONSTRAINT "t_question_on_general_test_english_general_test_english_id_fkey" FOREIGN KEY ("general_test_english_id") REFERENCES "t_general_test_english"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_test_response_english" ADD CONSTRAINT "t_test_response_english_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "t_general_test_english"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_test_response_english" ADD CONSTRAINT "t_test_response_english_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_user"("auth0_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_question_response_english" ADD CONSTRAINT "t_question_response_english_general_test_english_id_questi_fkey" FOREIGN KEY ("general_test_english_id", "question_id") REFERENCES "t_question_on_general_test_english"("general_test_english_id", "question_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "t_question_response_english" ADD CONSTRAINT "t_question_response_english_test_response_english_id_fkey" FOREIGN KEY ("test_response_english_id") REFERENCES "t_test_response_english"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_question_on_general_exam" ADD CONSTRAINT "t_question_on_general_exam_exam_question_id_fkey" FOREIGN KEY ("exam_question_id") REFERENCES "t_exam_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_question_on_general_exam" ADD CONSTRAINT "t_question_on_general_exam_general_exam_id_fkey" FOREIGN KEY ("general_exam_id") REFERENCES "t_general_exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_general_exam_response" ADD CONSTRAINT "t_general_exam_response_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "t_general_exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_general_exam_response" ADD CONSTRAINT "t_general_exam_response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_user"("auth0_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_general_exam_question_response" ADD CONSTRAINT "t_general_exam_question_response_general_exam_id_exam_ques_fkey" FOREIGN KEY ("general_exam_id", "exam_question_id") REFERENCES "t_question_on_general_exam"("general_exam_id", "exam_question_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "t_general_exam_question_response" ADD CONSTRAINT "t_general_exam_question_response_general_exam_response_id_fkey" FOREIGN KEY ("general_exam_response_id") REFERENCES "t_general_exam_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_lesson" ADD CONSTRAINT "t_lesson_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "t_course"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_course_question" ADD CONSTRAINT "t_course_question_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "t_lesson"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_course_lesson_response" ADD CONSTRAINT "t_course_lesson_response_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "t_lesson"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_course_lesson_response" ADD CONSTRAINT "t_course_lesson_response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_user"("auth0_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_question_response" ADD CONSTRAINT "t_question_response_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "t_course_question"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_question_response" ADD CONSTRAINT "t_question_response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_user"("auth0_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_question_response" ADD CONSTRAINT "t_question_response_course_lesson_response_id_fkey" FOREIGN KEY ("course_lesson_response_id") REFERENCES "t_course_lesson_response"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "t_english_test_part" ADD CONSTRAINT "t_english_test_part_english_test_id_fkey" FOREIGN KEY ("english_test_id") REFERENCES "t_english_test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_section" ADD CONSTRAINT "t_english_test_section_english_test_part_id_fkey" FOREIGN KEY ("english_test_part_id") REFERENCES "t_english_test_part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_task" ADD CONSTRAINT "t_english_test_task_english_test_section_id_fkey" FOREIGN KEY ("english_test_section_id") REFERENCES "t_english_test_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_task_match" ADD CONSTRAINT "t_english_test_task_match_english_test_section_id_fkey" FOREIGN KEY ("english_test_section_id") REFERENCES "t_english_test_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_question_match" ADD CONSTRAINT "t_english_test_question_match_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "t_english_test_task_match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_task_multiple_blank" ADD CONSTRAINT "t_english_test_task_multiple_blank_english_test_section_id_fkey" FOREIGN KEY ("english_test_section_id") REFERENCES "t_english_test_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_multiple_blank_question" ADD CONSTRAINT "t_english_test_multiple_blank_question_english_test_task_m_fkey" FOREIGN KEY ("english_test_task_multiple_blank_id") REFERENCES "t_english_test_task_multiple_blank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_question" ADD CONSTRAINT "t_english_test_question_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "t_english_test_task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
