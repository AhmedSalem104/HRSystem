//using HRSystem.Data;
//using HRSystem.Data.Entites;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace HRSystem.Services.UserService
//{
//   public class UserService:IUserService
//    {
//        #region Fields
//        readonly TajDBEntities2 _context;
//        #endregion
//        #region Constructors
//        public UserService(TajDBEntities2 context)
//        {
//            _context = context;

//        }

//        public Users GetUserIformation(string code, string password)
//        {
//           var userInfo= _context.Users.Where(u => u.Code == code && u.Password == password).FirstOrDefault();
//            return userInfo;
//        }

//        public Users GetUserIformationWithDate(string code, string password, DateTime toDate)
//        {
//            var userInfo = _context.Users.Where(u => u.Code == code && u.Password == password && u.ToDate >= toDate).FirstOrDefault();
//            return userInfo;
//        }


//        #endregion
//        #region Methods
//        public List<Users> GetAll()
//        {
//            return _context.Users.Where(a => a.IsDeleted == false).ToList();
//        }

//        public Users GetUserById(int? id)
//        {
//            return _context.Users.Where(c => c.Id == id).FirstOrDefault();
//        }

//        public EmployeeGroups GetEmpolyeeGropuById(int? id)
//        {
//            return _context.EmployeeGroups.Where(c => c.UsersId == id).FirstOrDefault();
//        }

        

//        public int? GetMaxUserCode()
//        {
//            return _context.Users.Max(a => a.Id) + 1;

//        }

//        public List<Employee> GetEmpsList()
//        {
//            return _context.Employee.Where(a => a.IsDeleted == false).ToList();
//        }

//        public List<Group> GetGroupsList()
//        {
//            return _context.Group.Where(a => a.IsDeleted == false).ToList();
//        }


//        public bool InsertemployeeGroup(EmployeeGroups EmployeeGroups)
//        {
//            try
//            {

//                    EmployeeGroups employeeGroups = new EmployeeGroups();
//                    employeeGroups.GroupId = EmployeeGroups.GroupId;
//                    employeeGroups.EmployeeId = (int)EmployeeGroups.EmployeeId;
//                    var UserId = _context.Users.Max(a => a.Id);
//                    employeeGroups.UsersId = UserId;
//                    employeeGroups.IsDeleted = false;

//                    _context.EmployeeGroups.Add(employeeGroups);
//                    _context.SaveChanges();
//                }
//            catch
//            {
//                return false;
//            }


//            return true;

//            }
          


//        public bool Insert(Users user)
//        {
//            try
//            {

//                user.IsDeleted = false;
//                user.Date = DateTime.Now;
//                user.ToDate = DateTime.Now;
//                user.LastLoginDate = DateTime.Now;
//                _context.Users.Add(user);
//                _context.SaveChanges();

//                return true;

//            }
//            catch
//            {
//                return false;
//            }
//        }



//        public bool UpdateEmployeeGroup(EmployeeGroups employeeGroups)
//        {

//            try
//            {


//                if (employeeGroups == null)
//                {
//                    throw new ArgumentNullException("employeeGroups");
//                }
//                var employeeGroupss = _context.EmployeeGroups.FirstOrDefault(a => a.UsersId == employeeGroups.UsersId);
//                employeeGroupss.GroupId = employeeGroups.GroupId;
//                employeeGroupss.EmployeeId = employeeGroups.EmployeeId;

//                //employeeGroups.Id = employeeGroupsId;
//                _context.Entry(employeeGroupss).State = EntityState.Detached;
//                _context.Entry(employeeGroupss).State = EntityState.Modified;
//                _context.SaveChanges();
//                return true;

//            }
//            catch (Exception ex)
//            {
//                var m = ex.Message;
//                return false;
//            }
//        }


//        public bool Update(Users user)
//        {

//            try
//            {


//                if (user == null)
//                {
//                    throw new ArgumentNullException("user");
//                }
//                user.IsDeleted = false;
//                user.Date = DateTime.Now;
//                //user.ToDate = DateTime.Now;
//                user.LastLoginDate = DateTime.Now;
//                _context.Entry(user).State = EntityState.Detached;
//                _context.Entry(user).State = EntityState.Modified;
//                _context.SaveChanges();
//                return true;

//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public bool Delete(int id)
//        {
//            try
//            {

//                var user = _context.Users.FirstOrDefault(m => m.Id == id);
//                user.IsDeleted = true;
//                _context.Entry(user).State = EntityState.Modified;
//                _context.SaveChanges();
//                return true;
//            }
//            catch 
//            {
//                return false;
//            }
//        }

        


//        #endregion
//    }
//}
