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
    
    public partial class ViewDecisionSchoolVacation
    {
        public int DecisionSchoolVacationID { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte EnclosureCount { get; set; }
        public int Owner { get; set; }
        public int EmpId { get; set; }
        public Nullable<short> VacationPeriod { get; set; }
        public string Education { get; set; }
        public string Specialization { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public Nullable<DateTime> ToDate { get; set; }
        public string ToDateH { get; set; }
        public byte VacType { get; set; }
        public string DecisionNo { get; set; }
        public string Notes { get; set; }
        public Nullable<byte> ReplacementType { get; set; }
        public Nullable<short> VacationApplicationYear { get; set; }
        public Nullable<int> VacationApplicationSerial { get; set; }
        public string OwnerName { get; set; }
        public string EmpName { get; set; }
        public string ClassName { get; set; }
        public string JobName { get; set; }
        public string JobLocationName { get; set; }
        public string DepartmentName { get; set; }
    }
}
