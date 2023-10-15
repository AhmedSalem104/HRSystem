using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionLongLegationViewModel
    {

        public int DecisionLongLegationId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public Nullable<DateTime> Date { get; set; }
        public string DateH { get; set; }
        [Required(ErrorMessage = "من فضلك اختار موظف  ")]

        public int? EmpId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        public Nullable<DateTime> FromDate { get; set; }
        public string FromDateH { get; set; }
    
        public Nullable<DateTime> ToDate { get; set; }
        public string ToDateH { get; set; }
        public string Notes { get; set; }
        public Nullable<short> Period { get; set; }
        public string DecisionNo { get; set; }
        public string Location { get; set; }
        public bool ExpandDecisionLegation { get; set; }
        public Nullable<int> OldDecisionLongLegationId { get; set; }
        public string OldDecisionNo { get; set; }
        public Nullable<DateTime> OldDecisionDate { get; set; }
        public string OldDecisionDateH { get; set; }
        public Nullable<short> DecisionsListYear { get; set; }
        public Nullable<short> DecisionsListSerial { get; set; }


        public string EmpName { get; set; }









        //public int DecisionLongLegationId { get; set; }
        //[Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        //public DateTime Date { get; set; }
        //public string DateH { get; set; }
        //[Required(ErrorMessage = "من فضلك اختار موظف  ")]

        //public int EmpId { get; set; }
        //[Required(ErrorMessage = "من فضلك ادخل التاريخ ")]

        //public DateTime FromDate { get; set; }
        //public string FromDateH { get; set; }

        //public DateTime ToDate { get; set; }
        //public string ToDateH { get; set; }
        //public string Notes { get; set; }
        //public short Period { get; set; }
        //public string DecisionNo { get; set; }
        //public string Location { get; set; }
        //public bool ExpandDecisionLegation { get; set; }
        //public int OldDecisionLongLegationId { get; set; }
        //public string OldDecisionNo { get; set; }
        //public DateTime OldDecisionDate { get; set; }
        //public string OldDecisionDateH { get; set; }
        //public short DecisionsListYear { get; set; }
        //public short DecisionsListSerial { get; set; }


        //public string EmpName { get; set; }









    }
}