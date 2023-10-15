using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class BirthVacDecDTO
    {


        public int BirthVacDecSerial { get; set; }
        public DateTime? Date { get; set; }
        public string DateH { get; set; }
        public int Owner { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public int EmpId { get; set; }
        public short VacationPeriod { get; set; }
        public DateTime? FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime? ToDate { get; set; }
        public string ToDateH { get; set; }
        public Nullable<int> SubstituteEmpId { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public string DecisionNo { get; set; }
        public string EltezamResponse { get; set; }
        public Nullable<short> DecisionsListYear { get; set; }
        public Nullable<short> DecisionsListSerial { get; set; }



        public string EmpName { get; set; }
        public string JobName { get; set; }
        public string ClassName { get; set; }
        public string JobLocationName { get; set; }
        public string DepartmentName { get; set; }
        public decimal StartSalary { get; set; }
        public string OwnerName { get; set; }
        public string SubstituteEmpName { get; set; }

    }
}
