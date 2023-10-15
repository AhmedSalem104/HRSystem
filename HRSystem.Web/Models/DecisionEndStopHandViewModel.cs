using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionEndStopHandViewModel
    {
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int DecisionEndStopHandID { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int Serial { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime? Date { get; set; }
        public string DateH { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public byte EnclosureCount { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int Owner { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int EmpId { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public string PublishedFrom { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int PublishNumber { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime? PublishDate { get; set; }
        public string PublishDateH { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public string Subject { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public string Approval { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public string Reason { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime? StartDate { get; set; }

        public string StartDateH { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime? SalaryStartDate { get; set; }
        public string SalaryStartDateH { get; set; }
        public string Notes { get; set; }


    }
}