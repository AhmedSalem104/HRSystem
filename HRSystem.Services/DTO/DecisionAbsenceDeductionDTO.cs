using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class DecisionAbsenceDeductionDTO
    {

        public int DecisionAbsenceDeductionID { get; set; }
        public string Serial { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte EnclosureCount { get; set; }
        public int Owner { get; set; }
        public int DepartmentId { get; set; }
        public string LetterId { get; set; }
        public DateTime LetterDate { get; set; }
        public string LetterDateH { get; set; }
        public short EmpCount { get; set; }
        public string Notes { get; set; }
        public string AbsenceMonth { get; set; }
        public string DeductMonth { get; set; }
        public string Reason { get; set; }
        public Nullable<byte> AbsenceMonthNo { get; set; }
        public Nullable<byte> DeductMonthNo { get; set; }
        public Nullable<short> Year { get; set; }
        public Nullable<byte> ReplacementType { get; set; }
        public Nullable<short> DecisionsListYear { get; set; }
        public Nullable<short> DecisionsListSerial { get; set; }

        public string OwnerName { get; set; }

        public string EmpName { get; set; }



    }
}
