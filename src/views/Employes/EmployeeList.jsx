import { useEffect, useState } from "react";
import { Edit, Trash, UserCheck, UserX } from "react-feather";
import { Table, Button, Badge } from "reactstrap";
import { DeleteCourse } from "../../services/api/DeleteCourse.api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DeactiveEmployee } from "../../services/api/deactiveEmployee";
import { ActiveEmployee } from "../../services/api/ActiveEmployee";
import { GetAllEmployees } from "./../../services/api/GetAllEmployees.api";
import { DeleteEmployee } from "../../services/api/DeleteEmployee.api";
import AdminEdit from "./EmployeeEdit";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAll = async () => {
      try {
        const employees = await GetAllEmployees();
        setEmployees(employees?.result);
      } catch (error) {}
    };
    getAll();
  }, []);

  const handleDelete = async (employeeId, employeeName) => {
    const originalStudents = [...employees];
    const newEmplo = employees.filter((m) => m._id !== employeeId);
    setEmployees(newEmplo);
    try {
      await DeleteEmployee(employeeId, employeeName);
      toast.warning(`دانشجو با موفقیت حذف شد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      setEmployees(originalStudents);
    }
  };

  const handleActive = async (employeeId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await ActiveEmployee(employeeId);
      toast.success(`وضعیت ادمین به فعال تغییر کرد`);
      navigate(0);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      //   setCourses(originalCourses);
    }
  };

  const handleDeactive = async (employeeId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await DeactiveEmployee(employeeId);
      toast.success(`وضعیت ادمین به فعال تغییر کرد`);
      navigate(0);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      //   setCourses(originalCourses);
    }
  };
  const [adminId, setAdminId] = useState();
  const [editAdminOpen, setEditAdminOpen] = useState(false);
  const toggleEditSidebar = () => setEditAdminOpen(!editAdminOpen);

  const handleEdit = (teacherId) => {
    toggleEditSidebar();
    setAdminId(teacherId);
  };

  return employees ? (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>نام دانشجو</th>
            <th>کد ملی</th>
            <th>شماره تماس</th>
            <th>تاریخ تولد</th>
            <th>وضعیت</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((em) => em.role === "admin")
            .map((course) => (
              <tr key={course._id}>
                <td>
                  <img
                    className="me-75"
                    src={course.profile}
                    alt="angular"
                    height="20"
                    width="20"
                  />
                  <span className="align-middle fw-bold">
                    {course.fullName}
                  </span>
                </td>
                <td>{course.nationalId}</td>
                <td>{course.phoneNumber}</td>
                <td>
                  {course.birthDate}
                  {/* <AvatarGroup data={course.students} /> */}
                </td>
                <td>
                  {course.isActive ? (
                    <Badge className="px-1" pill color="light-success">
                      فعال
                    </Badge>
                  ) : (
                    <Badge className="px-2" color="light-danger">
                      غیرفعال
                    </Badge>
                  )}
                </td>
                <td>
                  <div className="d-inline-block me-1 mb-1">
                    <Button.Ripple
                      color="primary"
                      size="sm"
                      onClick={() => handleEdit(course?._id)}
                    >
                      <Edit size={16} />
                    </Button.Ripple>
                  </div>
                  <div className="d-inline-block me-1 mb-1">
                    <Button.Ripple color="danger" size="sm">
                      <Trash
                        size={16}
                        onClick={() =>
                          handleDelete(course._id, course.fullName)
                        }
                      />
                    </Button.Ripple>
                  </div>
                  <div className="d-inline-block me-1 mb-1">
                    {course.isActive === true ? (
                      <Button.Ripple
                        color="danger"
                        size="sm"
                        onClick={() => handleDeactive(course._id)}
                      >
                        <UserX size={16} />
                      </Button.Ripple>
                    ) : (
                      <Button.Ripple
                        color="success"
                        size="sm"
                        onClick={() => handleActive(course._id)}
                      >
                        <UserCheck size={16} />
                      </Button.Ripple>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <AdminEdit
        open={editAdminOpen}
        toggleSidebar={toggleEditSidebar}
        adminId={adminId}
      />
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default EmployeesList;
