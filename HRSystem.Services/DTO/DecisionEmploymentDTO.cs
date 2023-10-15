using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class DecisionEmploymentDTO
    {

        public int DecisionEmploymentID { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte EnclosureCount { get; set; }
        public int Owner { get; set; }
        public string DependOn { get; set; }
        public int EmpId { get; set; }
        public bool MonthSalary { get; set; }
        public bool OnTrial { get; set; }
        public int Owner2 { get; set; }
        public string Notes { get; set; }
        public string DecisionNo { get; set; }
        public string ClassificationNo { get; set; }
        public Nullable<int> JobSerial { get; set; }


        public string EmpName { get; set; }



    }
}
