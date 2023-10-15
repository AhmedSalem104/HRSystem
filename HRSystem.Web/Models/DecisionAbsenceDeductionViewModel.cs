using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionAbsenceDeductionViewModel
    {


        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public int DecisionAbsenceDeductionID { get; set; }
        public string Serial { get; set; }
        [Required(ErrorMessage = "من فضلك  هذا الحقل مطلوب  ")]

        public DateTime? Date { get; set; }
        public string DateH { get; set; }
        [Required(ErrorMessage = "من فضلك  هذا الحقل مطلوب  ")]

        public byte EnclosureCount { get; set; }
        [Required(ErrorMessage = "من فضلك  هذا الحقل مطلوب  ")]

        public int Owner { get; set; }
        [Required(ErrorMessage = "من فضلك  هذا الحقل مطلوب  ")]

        public int DepartmentId { get; set; }
        [Required(ErrorMessage = "من فضلك  هذا الحقل مطلوب  ")]

        public string LetterId { get; set; }
        [Required(ErrorMessage = "من فضلك  هذا الحقل مطلوب  ")]

        public DateTime? LetterDate { get; set; }
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
        public int EmpId { get; set; }
        public int? IsAddH { get; set; }


        public List<UsersList> EmpsList { get; set; } = new List<UsersList>();


        public class UsersList
        {
            public int DecisionAbsenceDeductionID { get; set; }
            

            public int EmpId { get; set; }

            public int AbsenceDays { get; set; }

            public string AbsenceDate { get; set; }

            public string DeductHours { get; set; }


            public int DeductDays { get; set; }


            public int DeductMinutes { get; set; }

            public int DeductHoursNo { get; set; }

            public string Description { get; set; }
            public string EmpName { get; set; }
            public int? IsAdd { get; set; }
            public int? row { get; set; }

        }

    }




}
