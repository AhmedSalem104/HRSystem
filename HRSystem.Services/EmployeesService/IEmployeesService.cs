using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.EmployeesService
{
   public interface IEmployeesService

    {    
        List<QEmployee> GetEmployeeList();

    }
}
