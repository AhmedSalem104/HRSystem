using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionEndStopHandForPrintViewModel
    {

        public int DecisionEndStopHandID { get; set; }
        public int Serial { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte EnclosureCount { get; set; }
        public int Owner { get; set; }
        public int EmpId { get; set; }
        public string PublishedFrom { get; set; }
        public int PublishNumber { get; set; }
        public DateTime PublishDate { get; set; }
        public string PublishDateH { get; set; }
        public string Subject { get; set; }
        public string Approval { get; set; }
        public string Reason { get; set; }
        public DateTime StartDate { get; set; }
        public string StartDateH { get; set; }
        public DateTime SalaryStartDate { get; set; }
        public string SalaryStartDateH { get; set; }
        public string Notes { get; set; }


        public string EmpName { get; set; }

        public string IDNumber { get; set; }
        public string ContractDateH { get; set; }
        public byte DegreeID { get; set; }
        public byte ClassID { get; set; }

        public decimal StartSalary { get; set; }
        public string ClassName { get; set; }
        public string JobName { get; set; }
        public string DepartmentName { get; set; }
        public string JobLocationName { get; set; }


        public string OwnerName { get; set; }



    }
}