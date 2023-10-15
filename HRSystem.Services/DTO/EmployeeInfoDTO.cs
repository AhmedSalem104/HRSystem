using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class EmployeeInfoDTO
    {

        public int EmpID { get; set; }
        public string EmpName { get; set; }
        public string JobName { get; set; }
        public byte? ClassID { get; set; }
        public byte? DegreeID { get; set; }
        public string DepartmentName { get; set; }
        public string JobLocationName { get; set; }
        public string ContractDateH { get; set; }

        public string IDNumber { get; set; }
        public decimal StartSalary { get; set; }









    }
}
