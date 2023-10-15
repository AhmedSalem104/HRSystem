using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionStopHandViewModel
    {
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int DecisionStopHandID { get; set; }
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

        public string Subject { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int SubjectNumber { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime? SubjectDate { get; set; }
        public string SubjectDateH { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public string SubjectReason { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime? StartDate { get; set; }
        public string StartDateH { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public string Notes { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public string DecisionNo { get; set; }

    }
}