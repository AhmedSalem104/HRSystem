using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DTO
{
   public class DecisionLongLegationDTO
    {


        public int DecisionLongLegationId { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public int EmpId { get; set; }
        public DateTime FromDate { get; set; }
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



    }
}
