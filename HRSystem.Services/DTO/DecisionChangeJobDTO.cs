using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class DecisionChangeJobDTO
    {



        public int DecisionChangeJobID { get; set; }
        public Nullable<int> Serial { get; set; }

        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte EnclosureCount { get; set; }
        public int Owner { get; set; }
        public int EmpId { get; set; }
        public string LetterId { get; set; }
        public DateTime LetterDate { get; set; }
        public string LetterDateH { get; set; }

        public short JobId { get; set; }

        public byte ClassId { get; set; }

        public byte DegreeId { get; set; }

        public int DepartmentID { get; set; }
        public DateTime StartDate { get; set; }
        public string StartDateH { get; set; }
        public Nullable<int> OldFormingNumer { get; set; }
        public Nullable<int> NewFormingNumer { get; set; }
        public string ApprovalDepartment { get; set; }
        public string Notes { get; set; }
        public string AccordingTo { get; set; }
        public string ApprovalDepartmentPlace { get; set; }
        public string OldClassificationNo { get; set; }
        public string NewClassificationNo { get; set; }
        public Nullable<int> OldJobSerial { get; set; }
        public Nullable<int> NewJobSerial { get; set; }
        public Nullable<short> DecisionsListYear { get; set; }
        public Nullable<short> DecisionsListSerial { get; set; }


        public string DepartmentName { get; set; }
        public string JobName { get; set; }

        public string EmpName { get; set; }
        public string OwnerName { get; set; }




    }
}
