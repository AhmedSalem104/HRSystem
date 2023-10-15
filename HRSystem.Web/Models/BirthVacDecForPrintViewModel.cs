using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class BirthVacDecForPrintViewModel
    {
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int BirthVacDecSerial { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime Date { get; set; }
        public string DateH { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int Owner { get; set; }
        public byte EnclosureCount { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int EmpId { get; set; }
        public short VacationPeriod { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public int SubstituteEmpId { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public string DecisionNo { get; set; }
        public string EltezamResponse { get; set; }
        public short DecisionsListYear { get; set; }
        public short DecisionsListSerial { get; set; }



        public string EmpName { get; set; }
        public string JobName { get; set; }
        public string ClassName { get; set; }
        public string JobLocationName { get; set; }
        public string DepartmentName { get; set; }
        public decimal StartSalary { get; set; }
        public string OwnerName { get; set; }
        public string SubstituteEmpName { get; set; }




    }
}