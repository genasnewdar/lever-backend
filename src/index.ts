import App from './app';
import { CourseController } from './controllers/CourseController';
import { EnglishTestController } from './controllers/EnglishTestController';
import { ExamController } from './controllers/ExamController';
import { HealthController } from './controllers/HealthController';
import { PlacementController } from './controllers/PlacementController';
import { UserController } from './controllers/UserController';
import { AdminAcademyController } from './controllers/admin/AdminAcademyController';
import { AdminCourseController } from './controllers/admin/AdminCourseController';
import { AdminEnglishTestController } from './controllers/admin/AdminEnglishTestController';
import { AdminExamController } from './controllers/admin/AdminExamController';
import { AdminMathTestController } from './controllers/admin/AdminMathTestController';
import { AdminPlacementController } from './controllers/admin/AdminPlacementController';
import { AdminUserController } from './controllers/admin/AdminUserController';

const app = new App(
    [
        new HealthController(),
        new UserController(),
        new ExamController(),
        new PlacementController(),
        new CourseController(),
        new EnglishTestController(),

        new AdminEnglishTestController(),
        new AdminMathTestController(),
        new AdminAcademyController(),
        new AdminExamController(),
        new AdminPlacementController(),
        new AdminUserController(),
        new AdminCourseController
    ],
    8080,
);

app.listen();