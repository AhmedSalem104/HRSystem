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
    
    public partial class VacantJob
    {
        public int JobSerial { get; set; }
        public string JobName { get; set; }
        public string JobNo { get; set; }
        public string ClassificationNo { get; set; }
        public byte ClassID { get; set; }
        public Nullable<byte> DegreeID { get; set; }
        public string JobLocation { get; set; }
        public int DepartmentID { get; set; }
        public Nullable<DateTime> JobDate { get; set; }
        public string JobDateH { get; set; }
        public bool JobStatus { get; set; }
        public Nullable<DateTime> VacantDate { get; set; }
        public string VacantDateH { get; set; }
        public Nullable<int> EmpID { get; set; }
        public Nullable<int> JobID { get; set; }
        public Nullable<byte> JobLocationID { get; set; }
        public Nullable<byte> PaySlipID { get; set; }
        public string JobTrancsactionCode { get; set; }
        public string EltezamResponse { get; set; }
        public Nullable<DateTime> EndDate { get; set; }
        public string EndDateH { get; set; }
    }
}