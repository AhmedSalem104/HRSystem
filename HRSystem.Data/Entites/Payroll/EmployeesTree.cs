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
    
    public partial class EmployeesTree
    {
        public int EmployeeID { get; set; }
        public Nullable<int> ManagerId { get; set; }
        public int JobTypeId { get; set; }
        public string UserId { get; set; }
    
        public virtual AttendTrxEmployee AttendTrxEmployee { get; set; }
        public virtual JobType JobType { get; set; }
    }
}
