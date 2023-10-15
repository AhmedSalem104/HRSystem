using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionMoveEmpViewModel
    {


        [Required(ErrorMessage = "من فضلك ادخل الرقم ")]

        public int DecisionMoveEmpID { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل المسلسل ")]

        public int Serial { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public DateTime? Date { get; set; }
        public string DateH { get; set; }
        [Required(ErrorMessage = "من فضلك عدد المرفقات  ")]

        public byte EnclosureCount { get; set; }
        [Required(ErrorMessage = "من فضلك اختار صاحب الصلاحيه  ")]

        public int Owner { get; set; }
        public int EmpId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public DateTime? StartDate { get; set; }
        public string StartDateH { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public int LetterId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public DateTime? LetterDate { get; set; }

        public string LetterDateH { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public DateTime? StartWorkDate { get; set; }
        public string StartWorkDateH { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل الجهه المنقول اليها ")]

        public string Place { get; set; }
        public string BasedOn { get; set; }
        public string Notes { get; set; }
        public bool PayReward { get; set; }
        public string PayRewardDesc { get; set; }

        public string EmpName { get; set; }



    }
}