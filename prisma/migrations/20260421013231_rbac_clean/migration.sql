/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attendance_id` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Attendance` table. All the data in the column will be lost.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class_id` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `ClassSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class_id` on the `ClassSession` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `ClassSession` table. All the data in the column will be lost.
  - You are about to drop the column `session_year` on the `ClassSession` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `ClassSession` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `ClassSession` table. All the data in the column will be lost.
  - The primary key for the `FeePayment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `payment_date` on the `FeePayment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `FeePayment` table. All the data in the column will be lost.
  - You are about to drop the column `session_year` on the `FeePayment` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `FeePayment` table. All the data in the column will be lost.
  - The primary key for the `Grade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `grade_id` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `grade_letter` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `Grade` table. All the data in the column will be lost.
  - The primary key for the `Parent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `Parent` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `StudentParent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `parent_id` on the `StudentParent` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `StudentParent` table. All the data in the column will be lost.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subject_id` on the `Subject` table. All the data in the column will be lost.
  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `hire_date` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `FeePayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentId` to the `StudentParent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentParent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT', 'PARENT');

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_session_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_student_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "FeePayment" DROP CONSTRAINT "FeePayment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_session_id_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentParent" DROP CONSTRAINT "StudentParent_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentParent" DROP CONSTRAINT "StudentParent_student_id_fkey";

-- DropIndex
DROP INDEX "Admin_email_key";

-- DropIndex
DROP INDEX "Admin_school_name_key";

-- DropIndex
DROP INDEX "Teacher_email_key";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "admin_id",
DROP COLUMN "created_at",
DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "role",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_pkey",
DROP COLUMN "attendance_id",
DROP COLUMN "session_id",
DROP COLUMN "student_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "sessionId" INTEGER NOT NULL,
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "class_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_pkey",
DROP COLUMN "class_id",
DROP COLUMN "session_id",
DROP COLUMN "session_year",
DROP COLUMN "subject_id",
DROP COLUMN "teacher_id",
ADD COLUMN     "classId" INTEGER,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "sessionYear" TEXT,
ADD COLUMN     "subjectId" INTEGER,
ADD COLUMN     "teacherId" INTEGER,
ADD CONSTRAINT "ClassSession_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FeePayment" DROP CONSTRAINT "FeePayment_pkey",
DROP COLUMN "payment_date",
DROP COLUMN "payment_id",
DROP COLUMN "session_year",
DROP COLUMN "student_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "paymentDate" TIMESTAMP(3),
ADD COLUMN     "sessionYear" TEXT,
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD CONSTRAINT "FeePayment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_pkey",
DROP COLUMN "grade_id",
DROP COLUMN "grade_letter",
DROP COLUMN "session_id",
DROP COLUMN "student_id",
DROP COLUMN "subject_id",
ADD COLUMN     "gradeLetter" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "sessionId" INTEGER NOT NULL,
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "subjectId" INTEGER NOT NULL,
ADD CONSTRAINT "Grade_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_pkey",
DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "parent_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Parent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "name",
DROP COLUMN "student_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StudentParent" DROP CONSTRAINT "StudentParent_pkey",
DROP COLUMN "parent_id",
DROP COLUMN "student_id",
ADD COLUMN     "parentId" INTEGER NOT NULL,
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD CONSTRAINT "StudentParent_pkey" PRIMARY KEY ("studentId", "parentId");

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
DROP COLUMN "subject_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_pkey",
DROP COLUMN "email",
DROP COLUMN "hire_date",
DROP COLUMN "name",
DROP COLUMN "teacher_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ClassSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ClassSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeePayment" ADD CONSTRAINT "FeePayment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
