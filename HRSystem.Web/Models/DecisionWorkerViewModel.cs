using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionWorkerViewModel
    {

        [Required(ErrorMessage = "من فضلك رقم القرار ")]

        public int DecisionWorkersID { get; set; }
   
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]
        public DateTime? Date { get; set; }
        public string DateH { get; set; }

        [Required(ErrorMessage = "من فضلك ادخل عدد المرفقات ")]
        public byte EnclosureCount { get; set; }

        [Required(ErrorMessage = "من فضلك اختار صاحب الصلاحية  ")]
        public int Owner { get; set; }

        [Required(ErrorMessage = "من فضلك اختار الموظف  ")]
        public int? EmpId { get; set; }
        public bool MonthSalary { get; set; }
        public int? Owner2 { get; set; }
        public string Notes { get; set; }
        public string DecisionNo { get; set; }


        public string EmpName { get; set; }


    }
}