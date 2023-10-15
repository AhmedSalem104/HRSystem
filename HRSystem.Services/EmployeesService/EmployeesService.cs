using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.EmployeesService
{
    public class EmployeesService : IEmployeesService
    {
        #region Fields
        readonly PayrollEntities _context;
        #endregion
        #region Constructors
        public EmployeesService(PayrollEntities context)
        {
            _context = context;

        }

        #endregion


        #region Methods
        //public List<Employee> GetAll()
        //{

        //    //var servicesTrxList = (from DLL in _context.DecisionLongLegations
        //    //                       join E in _context.Employees on DLL.EmpId equals E.EmpID
                                   
        //    //                       select new DecisionLongLegationDTO()
        //    //                       {
        //    //                           DecisionLongLegationId = DLL.DecisionLongLegationId,
        //    //                           DateH = DLL.DateH,
        //    //                           EmpName = E.EmpName,
        //    //                           FromDateH = DLL.FromDateH,
        //    //                           ToDateH = DLL.ToDateH,
        //    //                           Period = DLL.Period

                                       

        //    //                       }).ToList();
        //    return _context.Employees.ToList();


        //}

        //public Employee GetEmployeesById(int? id)
        //{
        //    return _context.Employees.Where(c => c.EmpID == id).FirstOrDefault();
        //}

        //public int? GetEmployeesCode()
        //{
        //    //return _context.Warning.Max(a => a.WarnCode) + 1;
           
        //    var CodeNotNull = _context.Employees.Count();
        //    if (CodeNotNull != 0)
        //    {
        //        var Code = _context.Employees.Max(a => a.EmpID);

        //        return (Code + 1);
        //    }


        //    else
        //    {
        //        var CodeNull = 1;
        //        return (CodeNull);

        //    }
        //}

        //public bool Insert(Employee Employees)
        //{
        //    try
        //    {

        //        _context.Employees.Add(Employees);
        //        _context.SaveChanges();
        //        return true;

        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}

        //public bool Update(Employee Employees)
        //{
        //    try
        //    {


        //        if (Employees == null)
        //        {
        //            throw new ArgumentNullException("Employees");
        //        }
        //        _context.Entry(Employees).State = EntityState.Detached;
        //        _context.Entry(Employees).State = EntityState.Modified;
        //        _context.SaveChanges();
        //        return true;

        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}

        //public bool Delete(int id)
        //{
        //    try
        //    {

        //        var driver = _context.Employees.FirstOrDefault(m => m.EmpID == id);
        //        _context.Entry(driver).State = EntityState.Deleted;
        //        _context.SaveChanges();
        //        return true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}


    
        public List<QEmployee> GetEmployeeList()
        {
            return _context.QEmployees.ToList();
        }


       

      


        //public int GetMaxId()
        //{
        //    var count = _context.DecisionChangeJobs.ToList();
        //    var id = 0;
        //    if (count.Count() != 0)
        //    {
        //        id = _context.DecisionChangeJobs.Max(a => a.DecisionChangeJobID);
        //        return id;
        //    }
        //    return id;
        //}


    }
    #endregion
}

