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
    
    public partial class UserSetting
    {
        public string UserId { get; set; }
        public byte PayslipCombo { get; set; }
        public int DepartmentsCombo { get; set; }
        public int JobsCombo { get; set; }
        public int CurrentDepartment { get; set; }
        public int AttendanceGroupId { get; set; }
        public int LeaveTypeID { get; set; }
    }
}
