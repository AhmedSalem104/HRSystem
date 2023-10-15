using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class PaySlipViewModel
    {


        [Required(ErrorMessage = "من فضلك ادخل رقم المسير")]

        public byte PaySlipID { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل  اسم المسير")]

        public string PaySlipName { get; set; }
        public byte PaySlipTypeID { get; set; }
        public string ReportName { get; set; }
        public string EmploymentTypeCode { get; set; }
        public Nullable<long> EmpJobClass { get; set; }



    }
}