using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionNewJobForPrintViewModel
    {

        public short DecisionNewJobID { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte Subject { get; set; }
        public string EnclosureCount { get; set; }
        public int OwnerId { get; set; }
        public int EmpId { get; set; }
        public DateTime StartDate { get; set; }
        public string StartDateH { get; set; }
        public string Notes { get; set; }
        public string PromotionID { get; set; }
        public string DecisionNo { get; set; }
        public string ClassificationNo { get; set; }
        public int JobSerial { get; set; }
        public int ManagerId { get; set; }
        public short DecisionsListYear { get; set; }
        public short DecisionsListSerial { get; set; }






        public string EmpName { get; set; }
        public string IDNumber { get; set; }
        public string ContractDateH { get; set; }
        public byte DegreeID { get; set; }
        public byte ClassID { get; set; }

        public decimal StartSalary { get; set; }
        public string ClassName { get; set; }
        public string JobName { get; set; }
        public string DepartmentName { get; set; }


        public string OwnerName { get; set; }







    }
}