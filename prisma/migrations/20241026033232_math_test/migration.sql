/*
  Warnings:

  - You are about to drop the column `english_test_task_multiple_blank_id` on the `t_english_test_multiple_blank_question` table. All the data in the column will be lost.
  - You are about to drop the `t_english_test_task_match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_english_test_task_multiple_blank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_test_response_english` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `english_test_multiple_blank_task_id` to the `t_english_test_multiple_blank_question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "t_english_test_multiple_blank_question" DROP CONSTRAINT "t_english_test_multiple_blank_question_english_test_task_m_fkey";

-- DropForeignKey
ALTER TABLE "t_english_test_question_match" DROP CONSTRAINT "t_english_test_question_match_task_id_fkey";

-- DropForeignKey
ALTER TABLE "t_english_test_task_match" DROP CONSTRAINT "t_english_test_task_match_english_test_section_id_fkey";

-- DropForeignKey
ALTER TABLE "t_english_test_task_multiple_blank" DROP CONSTRAINT "t_english_test_task_multiple_blank_english_test_section_id_fkey";

-- DropForeignKey
ALTER TABLE "t_question_response_english" DROP CONSTRAINT "t_question_response_english_test_response_english_id_fkey";

-- DropForeignKey
ALTER TABLE "t_test_response_english" DROP CONSTRAINT "t_test_response_english_test_id_fkey";

-- DropForeignKey
ALTER TABLE "t_test_response_english" DROP CONSTRAINT "t_test_response_english_user_id_fkey";

-- AlterTable
ALTER TABLE "t_english_test_multiple_blank_question" DROP COLUMN "english_test_task_multiple_blank_id",
ADD COLUMN     "english_test_multiple_blank_task_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "t_english_test_task_match";

-- DropTable
DROP TABLE "t_english_test_task_multiple_blank";

-- DropTable
DROP TABLE "t_test_response_english";

-- CreateTable
CREATE TABLE "t_general_english_test_response" (
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

    CONSTRAINT "PK_general_english_test_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_match_task" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "english_test_section_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_english_test_match_task_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_multiple_blank_task" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "english_test_section_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_task_multiple_blank_task_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_response" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "english_test_id" INTEGER NOT NULL,
    "total_questions" INTEGER NOT NULL,
    "total_submitted" INTEGER NOT NULL DEFAULT 0,
    "total_correct" INTEGER NOT NULL DEFAULT 0,
    "total_incorrect" INTEGER NOT NULL DEFAULT 0,
    "total_points" INTEGER NOT NULL DEFAULT 0,
    "percentage_correct" DOUBLE PRECISION,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "finished_at" TIMESTAMP(3),
    "time_took_sec" INTEGER,
    "time_took" TEXT,
    "finish_before" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_part_response" (
    "id" SERIAL NOT NULL,
    "english_test_response_id" INTEGER NOT NULL,
    "english_test_part_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_part_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_section_response" (
    "id" SERIAL NOT NULL,
    "english_test_part_response_id" INTEGER NOT NULL,
    "english_test_section_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_section_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_task_response" (
    "id" SERIAL NOT NULL,
    "english_test_section_response_id" INTEGER NOT NULL,
    "english_test_task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_task_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_question_response" (
    "id" SERIAL NOT NULL,
    "english_test_task_response_id" INTEGER NOT NULL,
    "english_test_question_id" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "is_correct" BOOLEAN,
    "points" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_question_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_match_response" (
    "id" SERIAL NOT NULL,
    "english_test_section_response_id" INTEGER NOT NULL,
    "english_test_task_match_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_match_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_question_match_response" (
    "id" SERIAL NOT NULL,
    "english_test_match_response_id" INTEGER NOT NULL,
    "english_test_question_match_id" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "is_correct" BOOLEAN,
    "points" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_question_match_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_multiple_blank_response" (
    "id" SERIAL NOT NULL,
    "english_test_section_response_id" INTEGER NOT NULL,
    "english_test_task_multiple_blank_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_english_test_multiple_blank_task_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_english_test_multiple_blank_question_response" (
    "id" SERIAL NOT NULL,
    "response" TEXT NOT NULL,
    "is_correct" BOOLEAN,
    "points" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "blank_question_id" INTEGER NOT NULL,
    "blank_task_response_id" INTEGER NOT NULL,

    CONSTRAINT "PK_english_test_multiple_blank_question_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_math_test" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "duration" INTEGER NOT NULL DEFAULT 7200,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "total_points" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_math_test_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_math_test_part" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "order" INTEGER NOT NULL,
    "math_test_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_math_test_part_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_math_test_section" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "math_test_part_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_math_test_section_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_math_test_question" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "explanation" TEXT,
    "points" INTEGER NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL,
    "math_test_section_id" INTEGER NOT NULL,
    "choices" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_math_test_question_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_math_test_response" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "math_test_id" INTEGER NOT NULL,
    "total_questions" INTEGER NOT NULL,
    "total_submitted" INTEGER NOT NULL DEFAULT 0,
    "total_correct" INTEGER NOT NULL DEFAULT 0,
    "total_incorrect" INTEGER NOT NULL DEFAULT 0,
    "total_points" INTEGER NOT NULL DEFAULT 0,
    "percentage_correct" DOUBLE PRECISION,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "finished_at" TIMESTAMP(3),
    "time_took_sec" INTEGER,
    "time_took" TEXT,
    "finish_before" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_math_test_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_math_test_part_response" (
    "id" SERIAL NOT NULL,
    "math_test_response_id" INTEGER NOT NULL,
    "math_test_part_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_math_test_part_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_math_test_section_response" (
    "id" SERIAL NOT NULL,
    "math_test_part_response_id" INTEGER NOT NULL,
    "math_test_section_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_math_test_section_response_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_math_test_question_response" (
    "id" SERIAL NOT NULL,
    "math_test_section_response_id" INTEGER NOT NULL,
    "math_test_question_id" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "is_correct" BOOLEAN,
    "points" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_math_test_question_response_id" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "t_general_english_test_response" ADD CONSTRAINT "t_general_english_test_response_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "t_general_test_english"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_general_english_test_response" ADD CONSTRAINT "t_general_english_test_response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_user"("auth0_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_question_response_english" ADD CONSTRAINT "t_question_response_english_test_response_english_id_fkey" FOREIGN KEY ("test_response_english_id") REFERENCES "t_general_english_test_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_match_task" ADD CONSTRAINT "t_english_test_match_task_english_test_section_id_fkey" FOREIGN KEY ("english_test_section_id") REFERENCES "t_english_test_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_question_match" ADD CONSTRAINT "t_english_test_question_match_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "t_english_test_match_task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_multiple_blank_task" ADD CONSTRAINT "t_english_test_multiple_blank_task_english_test_section_id_fkey" FOREIGN KEY ("english_test_section_id") REFERENCES "t_english_test_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_multiple_blank_question" ADD CONSTRAINT "t_english_test_multiple_blank_question_english_test_multip_fkey" FOREIGN KEY ("english_test_multiple_blank_task_id") REFERENCES "t_english_test_multiple_blank_task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_response" ADD CONSTRAINT "t_english_test_response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_user"("auth0_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_response" ADD CONSTRAINT "t_english_test_response_english_test_id_fkey" FOREIGN KEY ("english_test_id") REFERENCES "t_english_test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_part_response" ADD CONSTRAINT "t_english_test_part_response_english_test_response_id_fkey" FOREIGN KEY ("english_test_response_id") REFERENCES "t_english_test_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_part_response" ADD CONSTRAINT "t_english_test_part_response_english_test_part_id_fkey" FOREIGN KEY ("english_test_part_id") REFERENCES "t_english_test_part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_section_response" ADD CONSTRAINT "t_english_test_section_response_english_test_part_response_fkey" FOREIGN KEY ("english_test_part_response_id") REFERENCES "t_english_test_part_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_section_response" ADD CONSTRAINT "t_english_test_section_response_english_test_section_id_fkey" FOREIGN KEY ("english_test_section_id") REFERENCES "t_english_test_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_task_response" ADD CONSTRAINT "t_english_test_task_response_english_test_section_response_fkey" FOREIGN KEY ("english_test_section_response_id") REFERENCES "t_english_test_section_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_task_response" ADD CONSTRAINT "t_english_test_task_response_english_test_task_id_fkey" FOREIGN KEY ("english_test_task_id") REFERENCES "t_english_test_task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_question_response" ADD CONSTRAINT "t_english_test_question_response_english_test_task_respons_fkey" FOREIGN KEY ("english_test_task_response_id") REFERENCES "t_english_test_task_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_question_response" ADD CONSTRAINT "t_english_test_question_response_english_test_question_id_fkey" FOREIGN KEY ("english_test_question_id") REFERENCES "t_english_test_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_match_response" ADD CONSTRAINT "t_english_test_match_response_english_test_section_respons_fkey" FOREIGN KEY ("english_test_section_response_id") REFERENCES "t_english_test_section_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_match_response" ADD CONSTRAINT "t_english_test_match_response_english_test_task_match_id_fkey" FOREIGN KEY ("english_test_task_match_id") REFERENCES "t_english_test_match_task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_question_match_response" ADD CONSTRAINT "t_english_test_question_match_response_english_test_match__fkey" FOREIGN KEY ("english_test_match_response_id") REFERENCES "t_english_test_match_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_question_match_response" ADD CONSTRAINT "t_english_test_question_match_response_english_test_questi_fkey" FOREIGN KEY ("english_test_question_match_id") REFERENCES "t_english_test_question_match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_multiple_blank_response" ADD CONSTRAINT "t_english_test_multiple_blank_response_english_test_sectio_fkey" FOREIGN KEY ("english_test_section_response_id") REFERENCES "t_english_test_section_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_multiple_blank_response" ADD CONSTRAINT "t_english_test_multiple_blank_response_english_test_task_m_fkey" FOREIGN KEY ("english_test_task_multiple_blank_id") REFERENCES "t_english_test_multiple_blank_task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_multiple_blank_question_response" ADD CONSTRAINT "t_english_test_multiple_blank_question_response_blank_ques_fkey" FOREIGN KEY ("blank_question_id") REFERENCES "t_english_test_multiple_blank_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_english_test_multiple_blank_question_response" ADD CONSTRAINT "t_english_test_multiple_blank_question_response_blank_task_fkey" FOREIGN KEY ("blank_task_response_id") REFERENCES "t_english_test_multiple_blank_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_part" ADD CONSTRAINT "t_math_test_part_math_test_id_fkey" FOREIGN KEY ("math_test_id") REFERENCES "t_math_test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_section" ADD CONSTRAINT "t_math_test_section_math_test_part_id_fkey" FOREIGN KEY ("math_test_part_id") REFERENCES "t_math_test_part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_question" ADD CONSTRAINT "t_math_test_question_math_test_section_id_fkey" FOREIGN KEY ("math_test_section_id") REFERENCES "t_math_test_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_response" ADD CONSTRAINT "t_math_test_response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_user"("auth0_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_response" ADD CONSTRAINT "t_math_test_response_math_test_id_fkey" FOREIGN KEY ("math_test_id") REFERENCES "t_math_test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_part_response" ADD CONSTRAINT "t_math_test_part_response_math_test_response_id_fkey" FOREIGN KEY ("math_test_response_id") REFERENCES "t_math_test_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_part_response" ADD CONSTRAINT "t_math_test_part_response_math_test_part_id_fkey" FOREIGN KEY ("math_test_part_id") REFERENCES "t_math_test_part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_section_response" ADD CONSTRAINT "t_math_test_section_response_math_test_part_response_id_fkey" FOREIGN KEY ("math_test_part_response_id") REFERENCES "t_math_test_part_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_section_response" ADD CONSTRAINT "t_math_test_section_response_math_test_section_id_fkey" FOREIGN KEY ("math_test_section_id") REFERENCES "t_math_test_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_question_response" ADD CONSTRAINT "t_math_test_question_response_math_test_section_response_i_fkey" FOREIGN KEY ("math_test_section_response_id") REFERENCES "t_math_test_section_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_math_test_question_response" ADD CONSTRAINT "t_math_test_question_response_math_test_question_id_fkey" FOREIGN KEY ("math_test_question_id") REFERENCES "t_math_test_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
