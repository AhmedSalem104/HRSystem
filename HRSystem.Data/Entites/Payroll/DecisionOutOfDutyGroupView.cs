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
    
    public partial class DecisionOutOfDutyGroupView
    {
        public int OutOfDutyGroupSerial { get; set; }
        public string OutOfDutyGroupNo { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public Nullable<int> OwnerId { get; set; }
        public Nullable<short> Period { get; set; }
        public decimal HoursRatio { get; set; }
        public string WorkDaysNotes { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public string Location { get; set; }
        public string Notes { get; set; }
        public string Description { get; set; }
        public string OwnerName { get; set; }
        public string OwnerPosition { get; set; }
        public Nullable<int> EmpId { get; set; }
        public string EmpName { get; set; }
        public Nullable<byte> ClassID { get; set; }
        public Nullable<byte> DegreeID { get; set; }
        public string ClassName { get; set; }
        public string JobName { get; set; }
        public string DepartmentName { get; set; }
    }
}
