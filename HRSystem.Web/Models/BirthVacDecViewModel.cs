using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class BirthVacDecViewModel
    {
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int BirthVacDecSerial { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime? Date { get; set; }
        public string DateH { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int Owner { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public int EmpId { get; set; }
        public short VacationPeriod { get; set; }
        [Required(ErrorMessage = "من فضلك هذا الحقل مطلوب  ")]

        public DateTime? FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime? ToDate { get; set; }
        public string ToDateH { get; set; }
        public Nullable<int> SubstituteEmpId { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public string DecisionNo { get; set; }
        public string EltezamResponse { get; set; }
        public Nullable<short> DecisionsListYear { get; set; }
        public Nullable<short> DecisionsListSerial { get; set; }

    }
}