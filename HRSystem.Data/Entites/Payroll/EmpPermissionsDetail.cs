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
    
    public partial class EmpPermissionsDetail
    {
        public short Year { get; set; }
        public int Serial { get; set; }
        public byte LineNo { get; set; }
        public int EmpId { get; set; }
        public int PermissionTypeId { get; set; }
        public decimal FromDecimal { get; set; }
        public string FromHm { get; set; }
        public decimal ToDecimal { get; set; }
        public string ToHm { get; set; }
        public string Reason { get; set; }
        public byte Days { get; set; }
        public Nullable<int> AttendanceGroupId { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual EmpPermission EmpPermission { get; set; }
        public virtual PermissionsType PermissionsType { get; set; }
    }
}
