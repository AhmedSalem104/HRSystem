using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class DecisionNewJobDTO
    {



        public short DecisionNewJobID { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte Subject { get; set; }
        public string EnclosureCount { get; set; }
        public Nullable<int> OwnerId { get; set; }
        public int EmpId { get; set; }
        public DateTime StartDate { get; set; }
        public string StartDateH { get; set; }
        public string Notes { get; set; }
        public string PromotionID { get; set; }
        public string DecisionNo { get; set; }
        public string ClassificationNo { get; set; }
        public Nullable<int> JobSerial { get; set; }
        public Nullable<int> ManagerId { get; set; }
        public Nullable<short> DecisionsListYear { get; set; }
        public Nullable<short> DecisionsListSerial { get; set; }




  

        public string EmpName { get; set; }
        public string IDNumber { get; set; }
        public string ContractDateH { get; set; }
        public Nullable<byte> DegreeID { get; set; }
        public Nullable<byte> ClassID { get; set; }

        public Nullable<decimal> StartSalary { get; set; }
        public string ClassName { get; set; }
        public string JobName { get; set; }
        public string DepartmentName { get; set; }


        public string OwnerName { get; set; }








    }
}
