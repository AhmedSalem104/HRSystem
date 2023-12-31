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
    
    public partial class DecisionSingleOutOfDuty
    {
        public int SingleOutOfDutySerial { get; set; }
        public string SingleOutOfDutyNo { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public Nullable<int> OwnerId { get; set; }
        public int EmpId { get; set; }
        public short Period { get; set; }
        public decimal HoursRatio { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public string Location { get; set; }
        public bool Legation { get; set; }
        public Nullable<short> LegationDays { get; set; }
        public Nullable<short> VacationDays { get; set; }
        public Nullable<short> AbsenceDays { get; set; }
        public string Notes { get; set; }
        public string WorkDaysNotes { get; set; }
        public string Description { get; set; }
        public Nullable<int> ManagerId { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual Owner Owner { get; set; }
    }
}
