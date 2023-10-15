using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class DecisionWorkerDTO
    {

        public int DecisionWorkersID { get; set; }

        public DateTime? Date { get; set; }
        public string DateH { get; set; }

        public byte EnclosureCount { get; set; }

        public int Owner { get; set; }

        public int? EmpId { get; set; }
        public bool MonthSalary { get; set; }
        public int? Owner2 { get; set; }
        public string Notes { get; set; }
        public string DecisionNo { get; set; }


        public string EmpName { get; set; }



    }
}
