import { useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';
import { Table, Button } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import {
  getAllCourses,
  deleteCourse,
} from '../../services/api/courses/courses';
import { Link } from 'react-router-dom';
import DataTableAdvSearch from '../common/Table';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      const courses = await getAllCourses();
      setCourses(courses.data.result);
    };
    getAll();
  }, []);

  const handleDelete = async (courseId) => {
    const originalCourses = courses;
    const newCourse = courses.filter((m) => m._id !== courseId);
    setCourses(newCourse);
    try {
      await deleteCourse(courseId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error('This movie already has been deleted');
        alert('hbfgdhvg');
      }
      setCourses(originalCourses);
    }
  };

  return (
    // <Table responsive>
    //   <thead>
    //     <tr>
    //       <th>نام درس</th>
    //       <th>مدرس</th>
    //       <th>ظرفیت</th>
    //       <th>دانشجویان</th>
    //       <th>قیمت </th>
    //       <th></th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {courses.map((course) => (
    //       <tr key={course._id}>
    //         <td>
    //           <img
    //             className="me-75"
    //             src={course.lesson.image}
    //             alt="angular"
    //             height="20"
    //             width="20"
    //           />
    //           <span className="align-middle fw-bold">
    //             {course.title}
    //           </span>
    //         </td>
    //         <td>{course.teacher.fullName}</td>
    //         <td>{course.capacity}</td>
    //         <td>
    //           ({course.students.length})
    //           <AvatarGroup data={course.students} />
    //         </td>
    //         <td>{course.cost}</td>
    //         <td>
    //           <div className="d-inline-block me-1 mb-1">
    //             <Link to={`/editCourse/${course._id}`}>
    //               <Button.Ripple color="primary" size="sm">
    //                 <Edit size={16} />
    //               </Button.Ripple>
    //             </Link>
    //           </div>
    //           <div className="d-inline-block me-1 mb-1">
    //             <Button.Ripple color="danger" size="sm">
    //               <Trash
    //                 size={16}
    //                 onClick={() => handleDelete(course._id)}
    //               />
    //             </Button.Ripple>
    //           </div>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
    <DataTableAdvSearch />
  );
};

export default Courses;
