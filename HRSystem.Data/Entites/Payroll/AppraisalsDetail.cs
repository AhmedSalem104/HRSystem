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
    
    public partial class AppraisalsDetail
    {
        public int AppraisalId { get; set; }
        public int EmpID { get; set; }
        public byte AppraisalType { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public Nullable<decimal> Result { get; set; }
    
        public virtual Appraisal Appraisal { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
