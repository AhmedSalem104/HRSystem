using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionChangeJobViewModel
    {

        [Required(ErrorMessage = "من فضلك ادخل الرقم ")]

        public int DecisionChangeJobID { get; set; }
        public Nullable<int> Serial { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public DateTime? Date { get; set; }
        public string DateH { get; set; }
        [Required(ErrorMessage = "من فضلك عدد المرفقات  ")]
        public byte EnclosureCount { get; set; }
        [Required(ErrorMessage = "من فضلك اختار صاحب الصلاحية  ")]
        public int Owner { get; set; }
        [Required(ErrorMessage = "من فضلك اختار الموظف  ")]
        public int? EmpId { get; set; }
        [Required(ErrorMessage = "من فضلك رقم الخطاب  ")]
        public string LetterId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل تاريخ الخطاب  ")]
        public DateTime? LetterDate { get; set; }
        public string LetterDateH { get; set; }
        [Required(ErrorMessage = "من فضلك اختار الوظيفة  ")]

        public short JobId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل رقم المرتبة الجديد  ")]

        public byte ClassId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل رقم الدرجة الجديدة ")]

        public byte DegreeId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل الادارة ")]

        public int DepartmentID { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]
        public DateTime? StartDate { get; set; }
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


        public string EmpName { get; set; }



    }
}