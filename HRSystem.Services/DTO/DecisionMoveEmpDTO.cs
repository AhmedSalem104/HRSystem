using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class DecisionMoveEmpDTO
    {



        public int DecisionMoveEmpID { get; set; }
        public int Serial { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte EnclosureCount { get; set; }
        public int Owner { get; set; }
        public int EmpId { get; set; }
        public DateTime StartDate { get; set; }
        public string StartDateH { get; set; }
        public int LetterId { get; set; }
        public DateTime LetterDate { get; set; }
        public string LetterDateH { get; set; }
        public DateTime StartWorkDate { get; set; }
        public string StartWorkDateH { get; set; }
        public string Place { get; set; }
        public string BasedOn { get; set; }
        public string Notes { get; set; }
        public bool PayReward { get; set; }
        public string PayRewardDesc { get; set; }
        public string DepartmentName { get; set; }
        public string JobName { get; set; }

        public string EmpName { get; set; }
        public string OwnerName { get; set; }




    }
}
