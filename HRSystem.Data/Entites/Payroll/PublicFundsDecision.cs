//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HRSystem.Data.Entites.Payroll
{
    using global::System;  using global::System.Diagnostics.CodeAnalysis;
    using global::System.Collections.Generic;
    
    public partial class PublicFundsDecision
    {
        public short Serial { get; set; }
        public string DecisionNo { get; set; }
        public DateTime DecisionDate { get; set; }
        public string DecisionDateH { get; set; }
        public int EmpID { get; set; }
        public string Side { get; set; }
        public string LetterSender { get; set; }
        public string LetterNo { get; set; }
        public DateTime LetterDate { get; set; }
        public string LetterDateH { get; set; }
        public string ArticleNo { get; set; }
        public decimal Amount { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
    
        public virtual Employee Employee { get; set; }
    }
}
