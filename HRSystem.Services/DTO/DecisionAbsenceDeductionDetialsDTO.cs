using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class DecisionAbsenceDeductionDetialsDTO
    {


        public int DecisionAbsenceDeductionID { get; set; }
        public int EmpId { get; set; }
        public Nullable<short> AbsenceDays { get; set; }
        public string AbsenceDate { get; set; }
        public string DeductHours { get; set; }
        public Nullable<short> DeductDays { get; set; }
        public short DeductMinutes { get; set; }
        public short DeductHoursNo { get; set; }
        public string Description { get; set; }

        public string EmpName { get; set; }



    }
}
